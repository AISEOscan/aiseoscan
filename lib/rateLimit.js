import { createClient } from '@supabase/supabase-js';
import crypto from 'crypto';

// Config - Global rate limits (per IP)
const MAX_REQUESTS_PER_HOUR = 25; 
const HOUR_IN_MS = 60 * 60 * 1000;

// Per-URL rate limits (per IP + URL combination)
const MAX_SCANS_PER_URL = 4; // Max 2 scans per URL per day
const DAY_IN_MS = 24 * 60 * 60 * 1000;

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_KEY || process.env.SUPABASE_ANON_KEY;
const supabase = supabaseClient();

function supabaseClient() {
  if (!supabaseUrl || !supabaseKey) {
    console.warn('Missing Supabase credentials for rate limiting');
    return null;
  }
  
  try {
    return createClient(supabaseUrl, supabaseKey);
  } catch (error) {
    console.error('Error initializing Supabase client:', error);
    return null;
  }
}

// Memory fallback
const rateLimitMap = new Map();
const urlScanMap = new Map();

/**
 * Create consistent hash for IP or URL
 */
function createHash(value) {
  return crypto.createHash('sha256').update(value).digest('hex');
}

/**
 * Normalize URL for consistent tracking
 */
function normalizeUrl(url) {
  try {
    const parsed = new URL(url);
    // Remove www, trailing slash, and lowercase
    return parsed.hostname.replace(/^www\./, '') + parsed.pathname.replace(/\/$/, '');
  } catch {
    return url.toLowerCase().replace(/^www\./, '').replace(/\/$/, '');
  }
}

/**
 * Check global IP-based rate limit
 */
export async function checkGlobalRateLimit(ip, userAgent = '') {
  // Bypass for internal/payment processing
  if (shouldBypassRateLimit(ip, userAgent)) {
    return { allowed: true, remaining: MAX_REQUESTS_PER_HOUR };
  }

  const now = Date.now();
  
  if (supabase) {
    try {
      const ipHash = createHash(ip);
      
      const { data, error } = await supabase
        .from('rate_limits')
        .select('*')
        .eq('ip_hash', ipHash)
        .single();
        
      if (error && error.code !== 'PGRST116') {
        console.log('Global rate limit check error:', error.message);
      } else {
        // No entry or window expired
        if (!data || (now - new Date(data.timestamp).getTime() > HOUR_IN_MS)) {
          await supabase
            .from('rate_limits')
            .upsert({
              ip_hash: ipHash,
              count: 1,
              timestamp: new Date().toISOString(),
              expires_at: new Date(now + HOUR_IN_MS).toISOString()
            }, {
              onConflict: 'ip_hash'
            });
            
          return { 
            allowed: true, 
            remaining: MAX_REQUESTS_PER_HOUR - 1,
            resetAt: new Date(now + HOUR_IN_MS)
          };
        }
        
        // Check if under limit
        if (data.count < MAX_REQUESTS_PER_HOUR) {
          await supabase
            .from('rate_limits')
            .update({ 
              count: data.count + 1,
              timestamp: new Date().toISOString()
            })
            .eq('ip_hash', ipHash);
            
          return { 
            allowed: true, 
            remaining: MAX_REQUESTS_PER_HOUR - (data.count + 1),
            resetAt: new Date(new Date(data.timestamp).getTime() + HOUR_IN_MS)
          };
        }
        
        // Over limit
        const resetAt = new Date(new Date(data.timestamp).getTime() + HOUR_IN_MS);
        return { 
          allowed: false, 
          remaining: 0,
          resetAt,
          message: `Rate limit exceeded. Please try again in ${getTimeUntil(resetAt)}.`
        };
      }
    } catch (error) {
      console.error('Supabase global rate limit error:', error);
    }
  }
  
  // Memory fallback
  return memoryBasedGlobalLimit(ip, now);
}

/**
 * Check per-URL scan limit (IP + URL combination)
 */
export async function checkUrlScanLimit(ip, url, userAgent = '') {
  // Bypass for internal/payment processing
  if (shouldBypassRateLimit(ip, userAgent)) {
    return { allowed: true, remaining: MAX_SCANS_PER_URL };
  }

  const normalizedUrl = normalizeUrl(url);
  const now = Date.now();
  
  if (supabase) {
    try {
      const ipHash = createHash(ip);
      const urlHash = createHash(normalizedUrl);
      
      const { data, error } = await supabase
        .from('url_scan_limits')
        .select('*')
        .eq('ip_hash', ipHash)
        .eq('url_hash', urlHash)
        .single();
        
      if (error && error.code !== 'PGRST116') {
        console.log('URL scan limit check error:', error.message);
      } else {
        // No entry or window expired (24 hours passed)
        if (!data || (now - new Date(data.first_scan_at).getTime() > DAY_IN_MS)) {
          await supabase
            .from('url_scan_limits')
            .upsert({
              ip_hash: ipHash,
              url_hash: urlHash,
              url: url, // Store actual URL for admin/debugging
              scan_count: 1,
              first_scan_at: new Date().toISOString(),
              last_scan_at: new Date().toISOString(),
              expires_at: new Date(now + DAY_IN_MS).toISOString()
            }, {
              onConflict: 'ip_hash,url_hash'
            });
            
          return { 
            allowed: true, 
            remaining: MAX_SCANS_PER_URL - 1,
            resetAt: new Date(now + DAY_IN_MS),
            scansUsed: 1
          };
        }
        
        // Check if under limit
        if (data.scan_count < MAX_SCANS_PER_URL) {
          await supabase
            .from('url_scan_limits')
            .update({ 
              scan_count: data.scan_count + 1,
              last_scan_at: new Date().toISOString()
            })
            .eq('ip_hash', ipHash)
            .eq('url_hash', urlHash);
            
          return { 
            allowed: true, 
            remaining: MAX_SCANS_PER_URL - (data.scan_count + 1),
            resetAt: new Date(new Date(data.first_scan_at).getTime() + DAY_IN_MS),
            scansUsed: data.scan_count + 1
          };
        }
        
        // Over limit
        const resetAt = new Date(new Date(data.first_scan_at).getTime() + DAY_IN_MS);
        const timeUntil = getTimeUntil(resetAt);
        
        return { 
          allowed: false, 
          remaining: 0,
          resetAt,
          scansUsed: data.scan_count,
          message: `You've reached the limit of ${MAX_SCANS_PER_URL} free scans for this URL. You can scan it again in ${timeUntil}, or upgrade to unlimited scans.`,
          upgradeUrl: '/buy-credits'
        };
      }
    } catch (error) {
      console.error('Supabase URL scan limit error:', error);
    }
  }
  
  // Memory fallback
  return memoryBasedUrlLimit(ip, normalizedUrl, now);
}

/**
 * Combined rate limit check (both global and per-URL)
 */
export async function rateLimit(ip, url = null, userAgent = '') {
  // Check global rate limit first
  const globalCheck = await checkGlobalRateLimit(ip, userAgent);
  
  if (!globalCheck.allowed) {
    return {
      allowed: false,
      type: 'global',
      ...globalCheck
    };
  }
  
  // If URL provided, also check per-URL limit
  if (url) {
    const urlCheck = await checkUrlScanLimit(ip, url, userAgent);
    
    if (!urlCheck.allowed) {
      return {
        allowed: false,
        type: 'url',
        ...urlCheck
      };
    }
    
    return {
      allowed: true,
      global: globalCheck,
      url: urlCheck
    };
  }
  
  return {
    allowed: true,
    global: globalCheck
  };
}

/**
 * Helper: Should bypass rate limiting
 */
function shouldBypassRateLimit(ip, userAgent) {
  return (
    ip === '127.0.0.1' || 
    ip === 'localhost' || 
    ip === '::1' || 
    ip === '::ffff:127.0.0.1' ||
    ip?.startsWith('10.') || 
    ip?.startsWith('172.16.') || 
    ip?.startsWith('192.168.') ||
    ip === '0.0.0.0' ||
    !ip || 
    ip === 'undefined' ||
    userAgent?.includes('Stripe') ||
    userAgent?.includes('webhook')
  );
}

/**
 * Helper: Format time until reset
 */
function getTimeUntil(date) {
  const ms = new Date(date).getTime() - Date.now();
  const minutes = Math.ceil(ms / (60 * 1000));
  const hours = Math.floor(minutes / 60);
  
  if (hours > 0) {
    const remainingMinutes = minutes % 60;
    return remainingMinutes > 0 
      ? `${hours}h ${remainingMinutes}m` 
      : `${hours} hour${hours > 1 ? 's' : ''}`;
  }
  
  return `${minutes} minute${minutes > 1 ? 's' : ''}`;
}

/**
 * Memory-based fallback for global limit
 */
function memoryBasedGlobalLimit(ip, now) {
  const entry = rateLimitMap.get(ip);

  if (!entry || now - entry.timestamp > HOUR_IN_MS) {
    rateLimitMap.set(ip, { count: 1, timestamp: now });
    return { 
      allowed: true, 
      remaining: MAX_REQUESTS_PER_HOUR - 1,
      resetAt: new Date(now + HOUR_IN_MS)
    };
  }

  if (entry.count < MAX_REQUESTS_PER_HOUR) {
    rateLimitMap.set(ip, { ...entry, count: entry.count + 1 });
    return { 
      allowed: true, 
      remaining: MAX_REQUESTS_PER_HOUR - entry.count - 1,
      resetAt: new Date(entry.timestamp + HOUR_IN_MS)
    };
  }

  const resetAt = new Date(entry.timestamp + HOUR_IN_MS);
  return { 
    allowed: false, 
    remaining: 0,
    resetAt,
    message: `Rate limit exceeded. Please try again in ${getTimeUntil(resetAt)}.`
  };
}

/**
 * Memory-based fallback for URL limit
 */
function memoryBasedUrlLimit(ip, normalizedUrl, now) {
  const key = `${ip}:${normalizedUrl}`;
  const entry = urlScanMap.get(key);

  if (!entry || now - entry.timestamp > DAY_IN_MS) {
    urlScanMap.set(key, { count: 1, timestamp: now });
    return { 
      allowed: true, 
      remaining: MAX_SCANS_PER_URL - 1,
      resetAt: new Date(now + DAY_IN_MS),
      scansUsed: 1
    };
  }

  if (entry.count < MAX_SCANS_PER_URL) {
    urlScanMap.set(key, { ...entry, count: entry.count + 1 });
    return { 
      allowed: true, 
      remaining: MAX_SCANS_PER_URL - entry.count - 1,
      resetAt: new Date(entry.timestamp + DAY_IN_MS),
      scansUsed: entry.count + 1
    };
  }

  const resetAt = new Date(entry.timestamp + DAY_IN_MS);
  return { 
    allowed: false, 
    remaining: 0,
    resetAt,
    scansUsed: entry.count,
    message: `You've reached the limit of ${MAX_SCANS_PER_URL} free scans for this URL. Try again in ${getTimeUntil(resetAt)}.`
  };
}
