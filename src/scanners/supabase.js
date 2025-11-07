import axios from 'axios';
import { REQUEST_TIMEOUT } from './index';

export async function scanForSupabaseIssues(url) {
  try {
    // Make sure URL is properly formatted
    const parsedUrl = new URL(url.startsWith('http') ? url : `https://${url}`);
    const baseUrl = `${parsedUrl.protocol}//${parsedUrl.hostname}`;
    
    console.log(`Starting Supabase security scan for: ${baseUrl}`);
    
    // Fetch the main page HTML
    const response = await axios.get(baseUrl, {
      timeout: REQUEST_TIMEOUT,
      validateStatus: () => true,
    });
    
    // Extract HTML content
    const htmlContent = response.data || '';
    const issues = [];
    
    // Skip if not a string (e.g., binary data)
    if (typeof htmlContent !== 'string') {
      return {
        scanner: 'supabase',
        status: 'completed',
        issues: []
      };
    }
    
    // 1. Check for Supabase client initialization in HTML
    const supabaseClientRegex = /supabase\.createClient\(['"]([^'"]+)['"]\s*,\s*['"]([^'"]+)['"]\)/g;
    let match;
    const anonKeys = [];
    
    while ((match = supabaseClientRegex.exec(htmlContent)) !== null) {
      if (match[2] && match[2].length > 20) {
        anonKeys.push(match[2]);
      }
    }
    
    // 2. Find script sources to check for Supabase client initialization
    const scriptSources = extractScriptSources(htmlContent, baseUrl);
    
    // 3. Check each script for Supabase client
    const scriptResults = await checkScriptsForSupabase(scriptSources, anonKeys);
    
    // 4. Check if Supabase is being used based on all evidence
    const isSupabaseDetected = anonKeys.length > 0 || scriptResults.isSupabaseDetected;
    anonKeys.push(...scriptResults.anonKeys); // Combine all found keys
    
    // Remove duplicates from anonKeys
    const uniqueAnonKeys = [...new Set(anonKeys)];
    
    if (isSupabaseDetected) {
      console.log(`Supabase usage detected on ${baseUrl}`);
      
      // Check if we found any anon keys
      if (uniqueAnonKeys.length > 0) {
        // Look for indicators that RLS might be used
        const rlsIndicators = await checkForRLSIndicators(scriptSources, baseUrl);
        
        if (!rlsIndicators.hasRLSIndicators) {
          issues.push({
            type: 'supabase-exposed-anon-key',
            severity: 'critical',
            description: 'Supabase public anon key exposed without apparent Row-Level Security (RLS)',
            fix: {
              title: 'Secure Supabase Implementation',
              description: 'Your Supabase anon key is exposed in client-side code. Without proper Row-Level Security (RLS) policies, this could allow unauthorized access to your database. Enable RLS for all tables and create appropriate policies.',
              code: `// 1. Enable RLS for your tables in the Supabase Dashboard
// SQL example:
ALTER TABLE your_table ENABLE ROW LEVEL SECURITY;

// 2. Create appropriate policies
CREATE POLICY "Users can only read their own data"
  ON your_table
  FOR SELECT
  USING (auth.uid() = user_id);

// 3. Check out Supabase's documentation on RLS:
// https://supabase.com/docs/guides/auth/row-level-security`
            }
          });
        } else {
          // RLS indicators found, but still include a low severity issue as a reminder
          issues.push({
            type: 'supabase-exposed-anon-key-with-rls',
            severity: 'low',
            description: 'Supabase public anon key exposed (RLS indicators detected)',
            fix: {
              title: 'Verify Supabase RLS Policies',
              description: 'We detected your Supabase anon key in client-side code and found indicators that RLS may be enabled. Double-check that all your tables have appropriate RLS policies to prevent unauthorized access.',
              code: `// Verify RLS is enabled for all tables:
SELECT tablename, rowlevelseurity 
FROM pg_tables 
WHERE schemaname = 'public'

// Review existing policies:
SELECT * FROM pg_policies;`
            }
          });
        }
      }
      
      // Check for other best practices
      if (scriptResults.hasSupabaseQueryClient && !scriptResults.hasErrorHandling) {
        issues.push({
          type: 'supabase-missing-error-handling',
          severity: 'medium',
          description: 'Supabase queries without proper error handling detected',
          fix: {
            title: 'Add Error Handling to Supabase Queries',
            description: 'Implement proper error handling for all Supabase database queries to improve application stability and security.',
            code: `// Example of proper error handling with Supabase
try {
  const { data, error } = await supabase
    .from('your_table')
    .select('*');
    
  if (error) {
    throw error;
  }
  
  // Process data here
} catch (error) {
  console.error('Error fetching data:', error);
  // Handle error appropriately
}`
          }
        });
      }
    }
    
    return {
      scanner: 'supabase',
      status: 'completed',
      issues
    };
  } catch (error) {
    console.error('Supabase scan error:', error);
    return {
      scanner: 'supabase',
      status: 'error',
      error: error.message,
      issues: []
    };
  }
}

// Extract script sources from HTML
function extractScriptSources(htmlContent, baseUrl) {
  try {
    const scriptRegex = /<script[^>]*src=["']([^"']+)["'][^>]*>/gi;
    const sources = [];
    let match;
    
    while ((match = scriptRegex.exec(htmlContent)) !== null) {
      let src = match[1];
      
      // Convert relative URLs to absolute
      if (src.startsWith('/')) {
        src = baseUrl + src;
      } else if (!src.startsWith('http')) {
        src = baseUrl + '/' + src;
      }
      
      sources.push(src);
    }
    
    // Also check inline scripts
    const inlineScriptRegex = /<script[^>]*>([\s\S]*?)<\/script>/gi;
    let inlineMatch;
    
    while ((inlineMatch = inlineScriptRegex.exec(htmlContent)) !== null) {
      if (inlineMatch[1] && inlineMatch[1].trim().length > 0) {
        sources.push({ isInline: true, content: inlineMatch[1] });
      }
    }
    
    return sources;
  } catch (error) {
    console.error('Error extracting script sources:', error);
    return [];
  }
}

// Check scripts for Supabase client initialization
async function checkScriptsForSupabase(sources, existingAnonKeys = []) {
  const result = {
    isSupabaseDetected: false,
    anonKeys: [],
    hasSupabaseQueryClient: false,
    hasErrorHandling: false
  };
  
  const supabaseClientRegex = /supabase\.createClient\(['"]([^'"]+)['"]\s*,\s*['"]([^'"]+)['"]\)/g;
  const supabaseImportRegex = /import\s+.*from\s+['"]@supabase\/supabase-js['"]/;
  const supabaseQueryRegex = /\.\s*from\s*\(\s*['"]([^'"]+)['"]\s*\)\s*\.\s*(select|insert|update|delete|upsert)\s*\(/;
  const errorHandlingRegex = /(if\s*\(\s*error\s*\)|\.catch\s*\(|try\s*{)/;
  
  for (const source of sources) {
    try {
      let content;
      
      if (source.isInline) {
        content = source.content;
      } else {
        try {
          const response = await axios.get(source, {
            timeout: REQUEST_TIMEOUT,
            validateStatus: () => true,
          });
          content = response.data;
        } catch (error) {
          continue; // Skip this source on error
        }
      }
      
      if (typeof content !== 'string') {
        continue;
      }
      
      // Check for Supabase imports
      if (supabaseImportRegex.test(content)) {
        result.isSupabaseDetected = true;
      }
      
      // Check for Supabase client initialization
      let clientMatch;
      while ((clientMatch = supabaseClientRegex.exec(content)) !== null) {
        result.isSupabaseDetected = true;
        
        if (clientMatch[2] && clientMatch[2].length > 20 && !existingAnonKeys.includes(clientMatch[2])) {
          result.anonKeys.push(clientMatch[2]);
        }
      }
      
      // Check for Supabase query client usage
      if (supabaseQueryRegex.test(content)) {
        result.isSupabaseDetected = true;
        result.hasSupabaseQueryClient = true;
        
        // Check for error handling
        if (errorHandlingRegex.test(content)) {
          result.hasErrorHandling = true;
        }
      }
    } catch (error) {
      console.error('Error checking script for Supabase:', error);
    }
  }
  
  return result;
}

// Check for indicators that RLS might be in use
async function checkForRLSIndicators(scriptSources, baseUrl) {
  const result = {
    hasRLSIndicators: false
  };
  
  // Patterns that suggest RLS is being used
  const rlsPatterns = [
    /enableRowLevelSecurity/i,
    /row_level_security/i,
    /RLS/,
    /create\s+policy/i,
    /auth\.uid\(\)/,
    /security\s+invoker/i,
    /security\s+definer/i
  ];
  
  // Check script sources first
  for (const source of scriptSources) {
    try {
      let content;
      
      if (source.isInline) {
        content = source.content;
      } else {
        try {
          const response = await axios.get(source, {
            timeout: REQUEST_TIMEOUT,
            validateStatus: () => true,
          });
          content = response.data;
        } catch (error) {
          continue; // Skip this source on error
        }
      }
      
      if (typeof content !== 'string') {
        continue;
      }
      
      // Check for patterns that suggest RLS is in use
      for (const pattern of rlsPatterns) {
        if (pattern.test(content)) {
          result.hasRLSIndicators = true;
          return result; // Return early if we found evidence
        }
      }
      
      // Check for userSession or user context patterns that often accompany RLS usage
      const userSessionPatterns = [
        /getUserSession/,
        /useUser/,
        /useAuth/,
        /useSession/,
        /supabase\.auth\.getSession/,
        /supabase\.auth\.getUser/
      ];
      
      for (const pattern of userSessionPatterns) {
        if (pattern.test(content)) {
          result.hasRLSIndicators = true;
          return result; // Return early if we found evidence
        }
      }
    } catch (error) {
      console.error('Error checking for RLS indicators:', error);
    }
  }
  
  // Finally, check if there might be auth-related endpoints
  try {
    const authEndpoints = ['/auth', '/api/auth', '/api/login', '/api/user'];
    
    for (const endpoint of authEndpoints) {
      try {
        const response = await axios.head(`${baseUrl}${endpoint}`, {
          timeout: REQUEST_TIMEOUT / 2, // Use shorter timeout for these checks
          validateStatus: () => true
        });
        
        // If we get a 200 or 401 (auth required), this might be an auth endpoint
        if (response.status === 200 || response.status === 401) {
          result.hasRLSIndicators = true;
          break;
        }
      } catch (error) {
        // Ignore errors here
      }
    }
  } catch (error) {
    console.error('Error checking auth endpoints:', error);
  }
  
  return result;
}