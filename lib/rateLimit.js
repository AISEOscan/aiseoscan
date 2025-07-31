import { createClient } from '@supabase/supabase-js';

// Config - Increased limits to handle multiple scans
const MAX_REQUESTS = 55; // Increased .

const WINDOW_IN_MS = 60 * 60 * 1000; // 1 hour

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_KEY || process.env.SUPABASE_ANON_KEY;
const supabase = supabaseClient();

// Use a function for initialization to handle potential issues
function supabaseClient() {
  if (!supabaseUrl || !supabaseKey) {
    console.warn('Missing Supabase credentials for rate limiting, falling back to memory-only');
    return null;
  }
  
  try {
    return createClient(supabaseUrl, supabaseKey);
  } catch (error) {
    console.error('Error initializing Supabase client for rate limiting:', error);
    return null;
  }
}

// Memory fallback in case Supabase is unavailable
const rateLimitMap = new Map();

export async function rateLimit(ip, userAgent = '') {
  // CRITICAL: Completely bypass rate limiting for payment processing 
  // and background processes to ensure they complete
  if (ip === '127.0.0.1' || 
      ip === 'localhost' || 
      ip === '::1' || 
      ip === '::ffff:127.0.0.1' ||
      userAgent.includes('Stripe') ||
      userAgent.includes('webhook')) {
    return { allowed: true, remaining: MAX_REQUESTS };
  }

  // ADDED: Bypass for Vercel internal IPs (serverless functions)
  if (ip.startsWith('10.') || 
      ip.startsWith('172.16.') || 
      ip.startsWith('192.168.') ||
      ip === '0.0.0.0' ||
      !ip || 
      ip === 'undefined') {
    return { allowed: true, remaining: MAX_REQUESTS };
  }

  const now = Date.now();
  
  // Try with Supabase first if available
  if (supabase) {
    try {
      // Use a consistent key format
      const ipHash = Buffer.from(ip).toString('base64');
      
      // Check for existing rate limit entry
      const { data, error } = await supabase
        .from('rate_limits')
        .select('*')
        .eq('ip_hash', ipHash)
        .single();
        
      if (error && error.code !== 'PGRST116') {
        console.log('Rate limit query error (falling back to memory):', error.message);
        // Fall through to memory-based rate limiting
      } else {
        // Check if no existing entry or window expired
        if (!data || (now - new Date(data.timestamp).getTime() > WINDOW_IN_MS)) {
          // Create/reset entry - use upsert properly
          const { error: upsertError } = await supabase
            .from('rate_limits')
            .upsert({
              ip_hash: ipHash,
              count: 1,
              timestamp: new Date().toISOString(),
              expires_at: new Date(now + WINDOW_IN_MS).toISOString()
            }, {
              onConflict: 'ip_hash' // Specify the conflict column
            });
            
          if (upsertError) {
            console.log('Rate limit upsert error (falling back to memory):', upsertError.message);
            // Fall through to memory-based rate limiting
          } else {
            return { allowed: true, remaining: MAX_REQUESTS - 1 };
          }
        } else {
          // Existing entry within window - check if under limit
          if (data.count < MAX_REQUESTS) {
            // Update count
            const { error: updateError } = await supabase
              .from('rate_limits')
              .update({ 
                count: data.count + 1,
                timestamp: new Date().toISOString() // Update timestamp too
              })
              .eq('ip_hash', ipHash);
              
            if (updateError) {
              console.log('Rate limit update error (falling back to memory):', updateError.message);
              // Fall through to memory-based rate limiting
            } else {
              return { allowed: true, remaining: MAX_REQUESTS - (data.count + 1) };
            }
          } else {
            // Over limit
            return { allowed: false, remaining: 0 };
          }
        }
      }
      
    } catch (error) {
      console.error('Supabase rate limiting error (falling back to memory):', error);
      // Fall back to memory-based rate limiting if Supabase fails
    }
  }
  
  // Memory-based fallback (existing implementation)
  const entry = rateLimitMap.get(ip);

  if (!entry || now - entry.timestamp > WINDOW_IN_MS) {
    // Reset if no entry or window passed
    rateLimitMap.set(ip, { count: 1, timestamp: now });
    return { allowed: true, remaining: MAX_REQUESTS - 1 };
  }

  if (entry.count < MAX_REQUESTS) {
    // Update count
    rateLimitMap.set(ip, { ...entry, count: entry.count + 1 });
    return { allowed: true, remaining: MAX_REQUESTS - entry.count - 1 };
  }

  // Deny request
  return { allowed: false, remaining: 0 };
}
