import { createClient } from '@supabase/supabase-js';
import { generatePdf } from './pdf';
import { nanoid } from 'nanoid';

// Generate a unique report ID with public ID
export function generateReportId() {
  // Use high-precision timestamp with random suffix for uniqueness
  const timestamp = Date.now();
  const randomSuffix = Math.random().toString(36).substring(2, 15);
  const microTime = performance.now().toString().replace('.', '');
  
  const internalId = `report_${timestamp}_${microTime}_${randomSuffix}`;
  const publicId = nanoid(16); // 16 characters - unpredictable but not too long
  
  console.log(`🆔 Generated unique report IDs: ${publicId} (public) -> ${internalId} (internal)`);
  
  return {
    id: internalId,
    publicId: publicId
  };
}

export function generateScanId() {
  const timestamp = Date.now();
  const randomPart = Math.random().toString(36).substring(2, 15);
  
  // Handle both browser and Node.js environments
  let microTime;
  if (typeof performance !== 'undefined' && performance.now) {
    microTime = performance.now().toString().replace('.', '');
  } else {
    // Fallback for Node.js environment
    microTime = (Date.now() + Math.random()).toString().replace('.', '');
  }
  
  const scanId = `scan_${timestamp}_${microTime}_${randomPart}`;
  console.log(`🔍 Generated unique scan ID: ${scanId}`);
  
  return scanId;
}

// Store a report with both IDs
export async function storeReport(reportData) {
  console.log(`Storing report with public ID: ${reportData.publicId}`);
  
  try {
    // Ensure publicId exists
    if (!reportData.publicId) {
      reportData.publicId = nanoid(16);
    }
    
    // Use the internal ID as the key in the map
    const reportObject = {
      data: reportData,
      timestamp: Date.now(),
      expiryHours: parseInt(process.env.REPORT_EXPIRY_HOURS || '24')
    };
    
    // Store in memory cache using internal ID
    reportStore.set(reportData.id, reportObject);
    
    // Store mapping from public ID to internal ID
    reportStore.set(`public_${reportData.publicId}`, { 
      internalId: reportData.id,
      timestamp: Date.now(),
      expiryHours: parseInt(process.env.REPORT_EXPIRY_HOURS || '24')
    });
    
    // Calculate expiration timestamp
    const expiryTime = new Date(reportObject.timestamp + (reportObject.expiryHours * 60 * 60 * 1000));
    
    // Store in Supabase
    if (supabase) {
      try {
        const { error } = await supabase
          .from('reports')
          .upsert({
            id: reportData.id,
            public_id: reportData.publicId,
            data: reportData,
            created_at: new Date(reportObject.timestamp).toISOString(),
            expires_at: expiryTime.toISOString(),
            status: reportData.status,
            url: reportData.url
          });
          
        if (error) throw error;
        console.log(`Stored report ${reportData.publicId} in Supabase`);
      } catch (dbError) {
        console.error(`Error storing report ${reportData.publicId} in database:`, dbError);
      }
    }
    
    return reportData.publicId; // Return public ID
  } catch (error) {
    console.error(`Error storing report:`, error);
    return reportData.publicId || nanoid(16); // Return public ID even if storage failed
  }
}

// Get a report by ID (works with both public and internal IDs)
export async function getReport(id) {
  console.log(`Retrieving report: ${id}`);
  
  // If this is a public ID, get the internal ID first
  let internalId = id;
  
  // Check if this appears to be a public ID
  if (id.length === 16 && !id.startsWith('report_')) {
    // Look up internal ID from public ID
    const publicMapping = reportStore.get(`public_${id}`);
    
    if (publicMapping && publicMapping.internalId) {
      internalId = publicMapping.internalId;
      console.log(`Resolved public ID ${id} to internal ID ${internalId}`);
    } else if (supabase) {
      // Try to find in Supabase
      try {
        const { data, error } = await supabase
          .from('reports')
          .select('id')
          .eq('public_id', id)
          .single();
          
        if (!error && data) {
          internalId = data.id;
          console.log(`Resolved public ID ${id} to internal ID ${internalId} from database`);
        }
      } catch (error) {
        console.error(`Error resolving public ID ${id}:`, error);
      }
    }
  }
  
  // Now proceed with the internal ID
  const cachedReport = reportStore.get(internalId);
  if (cachedReport) {
    console.log(`Found report ${internalId} in memory cache`);
    
    // Check if report is expired
    const expiryTime = cachedReport.timestamp + (cachedReport.expiryHours * 60 * 60 * 1000);
    if (Date.now() > expiryTime) {
      reportStore.delete(internalId);
      // Also delete public mapping if it exists
      if (cachedReport.data && cachedReport.data.publicId) {
        reportStore.delete(`public_${cachedReport.data.publicId}`);
      }
      console.log(`Report ${internalId} is expired, removing from cache`);
      return null;
    } else {
      // Return normalized version of cached data
      return normalizeResults(cachedReport.data);
    }
  }
  
  // If not in cache or expired, try Supabase
  if (supabase) {
    try {
      let query;
      
      // Execute the appropriate query based on ID type
      if (id.length === 16 && !id.startsWith('report_')) {
        console.log(`Querying Supabase for public_id: ${id}`);
        const { data: publicData, error: publicError } = await supabase
          .from('reports')
          .select('*')
          .eq('public_id', id)
          .single();
          
        if (publicError) {
          console.error(`Error querying by public_id: ${publicError.message}`);
          throw publicError;
        }
        
        if (!publicData) {
          console.log(`No report found with public_id: ${id}`);
          return null;
        }
        
        query = { data: publicData, error: null };
      } else {
        console.log(`Querying Supabase for internal id: ${internalId}`);
        const { data: internalData, error: internalError } = await supabase
          .from('reports')
          .select('*')
          .eq('id', internalId)
          .single();
          
        if (internalError) {
          console.error(`Error querying by internal id: ${internalError.message}`);
          throw internalError;
        }
        
        if (!internalData) {
          console.log(`No report found with internal id: ${internalId}`);
          return null;
        }
        
        query = { data: internalData, error: null };
      }
      
      const { data, error } = query;
      
      if (error) throw error;
      if (!data) {
        console.log(`Report ${id} not found in database`);
        return null;
      }
      
      // Check if report is expired
      if (new Date(data.expires_at) < new Date()) {
        console.log(`Report ${id} is expired`);
        return null;
      }
      
      console.log(`Found report ${id} in database`);
      
      // Normalize the report data
      const normalizedData = normalizeResults(data.data);
      
      // Add to memory cache
      reportStore.set(data.id, {
        data: normalizedData,
        timestamp: new Date(data.created_at).getTime(),
        expiryHours: Math.round((new Date(data.expires_at) - new Date(data.created_at)) / (60 * 60 * 1000))
      });
      
      // Also add public ID mapping
      if (data.public_id) {
        reportStore.set(`public_${data.public_id}`, {
          internalId: data.id,
          timestamp: new Date(data.created_at).getTime(),
          expiryHours: Math.round((new Date(data.expires_at) - new Date(data.created_at)) / (60 * 60 * 1000))
        });
      }
      
      return normalizedData;
    } catch (error) {
      console.error(`Error retrieving report ${id} from database:`, error);
    }
  }
  
  console.log(`Report ${id} not found`);
  return null;
}

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_KEY;
const supabase = supabaseClient();

// Use a function for initialization to handle potential issues
function supabaseClient() {
  if (!supabaseUrl || !supabaseKey) {
    console.warn('Missing Supabase credentials, falling back to memory-only storage');
    return null;
  }
  
  try {
    return createClient(supabaseUrl, supabaseKey);
  } catch (error) {
    console.error('Error initializing Supabase client:', error);
    return null;
  }
}

// Memory cache for faster access
const reportStore = new Map();

// Clean old reports periodically
export async function cleanExpiredReports() {
  const now = new Date().toISOString();
  console.log('Cleaning expired reports');
  
  try {
    // Delete expired reports from Supabase
    if (supabase) {
      const { error, data } = await supabase
        .from('reports')
        .delete()
        .lt('expires_at', now);
        
      if (error) throw error;
      console.log(`Cleaned ${data?.length || 0} expired reports from Supabase`);
    }
    
    // Clean memory cache
    let cleanedCount = 0;
    for (const [reportId, report] of reportStore.entries()) {
      if (!report || !report.timestamp || !report.expiryHours) continue;
      
      const expiryTime = report.timestamp + (report.expiryHours * 60 * 60 * 1000);
      if (Date.now() > expiryTime) {
        reportStore.delete(reportId);
        cleanedCount++;
      }
    }
    console.log(`Cleaned ${cleanedCount} expired reports from memory cache`);
    
    return cleanedCount;
  } catch (error) {
    console.error('Error cleaning reports:', error);
    return 0;
  }
}

// Run cleanup daily
if (typeof setInterval !== 'undefined') {
  setInterval(() => {
    cleanExpiredReports().catch(err => console.error('Error running scheduled cleanup:', err));
  }, 24 * 60 * 60 * 1000);
}

// Format time remaining until report expiration
export async function getReportExpiryTime(reportId) {
  // Try from memory cache
  const cachedReport = reportStore.get(reportId);
  if (cachedReport) {
    const expiryTime = cachedReport.timestamp + (cachedReport.expiryHours * 60 * 60 * 1000);
    const timeRemaining = expiryTime - Date.now();
    
    if (timeRemaining <= 0) return 'Expired';
    
    const hoursRemaining = Math.floor(timeRemaining / (60 * 60 * 1000));
    const minutesRemaining = Math.floor((timeRemaining % (60 * 60 * 1000)) / (60 * 1000));
    
    if (hoursRemaining > 0) {
      return `${hoursRemaining} hours and ${minutesRemaining} minutes`;
    } else {
      return `${minutesRemaining} minutes`;
    }
  }
  
  // Try from Supabase if available
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('reports')
        .select('expires_at')
        .eq('id', reportId)
        .single();
        
      if (error || !data) return null;
      
      const expiryTime = new Date(data.expires_at).getTime();
      const timeRemaining = expiryTime - Date.now();
      
      if (timeRemaining <= 0) return 'Expired';
      
      const hoursRemaining = Math.floor(timeRemaining / (60 * 60 * 1000));
      const minutesRemaining = Math.floor((timeRemaining % (60 * 60 * 1000)) / (60 * 1000));
      
      if (hoursRemaining > 0) {
        return `${hoursRemaining} hours and ${minutesRemaining} minutes`;
      } else {
        return `${minutesRemaining} minutes`;
      }
    } catch (error) {
      console.error(`Error getting expiry time for ${reportId}:`, error);
      return null;
    }
  }
  
  return null;
}

// Get all reports
export async function getAllReports() {
  try {
    if (supabase) {
      const { data, error } = await supabase
        .from('reports')
        .select('*')
        .order('created_at', { ascending: false });
        
      if (error) throw error;
      
      return (data || []).map(report => ({
        id: report.id,
        status: report.status,
        url: report.url,
        timestamp: new Date(report.created_at).getTime(),
        expiry: report.expires_at
      }));
    }
    
    // Fallback to memory cache
    return Array.from(reportStore.entries()).map(([id, report]) => ({
      id,
      status: report.data.status,
      url: report.data.url,
      timestamp: report.timestamp,
      expiry: new Date(report.timestamp + (report.expiryHours * 60 * 60 * 1000)).toISOString()
    }));
  } catch (error) {
    console.error('Error getting all reports:', error);
    
    // Fallback to memory cache on error
    return Array.from(reportStore.entries()).map(([id, report]) => ({
      id,
      status: report.data.status,
      url: report.data.url,
      timestamp: report.timestamp,
      expiry: new Date(report.timestamp + (report.expiryHours * 60 * 60 * 1000)).toISOString()
    }));
  }
}


function normalizeResults(reportData) {
  if (!reportData) return reportData;
  
  // Make a deep copy to avoid modifying the original
  let normalizedData;
  try {
    normalizedData = JSON.parse(JSON.stringify(reportData));
  } catch (e) {
    console.error('Error during JSON serialization, using original data:', e);
    normalizedData = reportData;
  }
  
  // ONLY ensure basic structure exists - don't modify the data
  if (!normalizedData.summary) {
    normalizedData.summary = {
      total: 0,
      critical: 0,
      medium: 0,
      low: 0
    };
  }
  
  if (!normalizedData.issues) {
    normalizedData.issues = [];
  }
  
  if (!normalizedData.scanners) {
    normalizedData.scanners = {};
  }
  

  // Let processMultiDimensionalData() handle all categorization
  
  return normalizedData;
}

// ============================================
// TOKEN MANAGEMENT FUNCTIONS (for agency packages)
// Added for bulk credit system - does not affect existing report functionality
// ============================================

/**
 * Get token data by token string
 * @param {string} token - The token to look up
 * @returns {Object|null} Token data with credits, or null if not found
 */
export async function getToken(token) {
  if (!supabase) {
    console.error('Supabase not available for token lookup');
    return null;
  }

  try {
    const { data, error } = await supabase
      .from('tokens')
      .select('credits')
      .eq('token', token)
       .maybeSingle();

    if (error || !data) {
      console.log(`Token ${token} not found or error:`, error?.message);
      return null;
    }

    console.log(`Token ${token} has ${data.credits} credits`);
    return data;
  } catch (error) {
    console.error('Error getting token:', error);
    return null;
  }
}

/**
 * Use a token credit to unlock a report
 * @param {string} token - The token to use
 * @param {string} publicId - The report public ID to unlock
 * @returns {Object} Result object with success status and remaining credits
 */
export async function useToken(token, publicId) {
  if (!supabase) {
    console.error('Supabase not available for token usage');
    return { success: false, error: 'Database unavailable' };
  }

  try {
    // Get current credits
    const tokenData = await getToken(token);
    
    if (!tokenData || tokenData.credits <= 0) {
      return { success: false, error: 'Invalid or expired token' };
    }

    // Deduct credit
    const { error: updateError } = await supabase
      .from('tokens')
      .update({ credits: tokenData.credits - 1 })
      .eq('token', token);

    if (updateError) {
      console.error('Error updating token credits:', updateError);
      throw updateError;
    }

    console.log(`Deducted 1 credit from token ${token}. Remaining: ${tokenData.credits - 1}`);

    // Get and update report
    const report = await getReport(publicId);
    if (!report) {
      // Rollback: add credit back
      await supabase.from('tokens').update({ credits: tokenData.credits }).eq('token', token);
      return { success: false, error: 'Report not found' };
    }

    const updatedReport = {
      ...report,
      status: 'completed',
      completedAt: new Date().toISOString(),
      paymentConfirmed: true,
      paidWithToken: token
    };

    const storedPublicId = await storeReport(updatedReport);
    console.log(`Report ${storedPublicId} unlocked with token ${token}`);

    return {
      success: true,
      creditsRemaining: tokenData.credits - 1
    };
  } catch (error) {
    console.error('Error using token:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Store a new token after package purchase
 * @param {Object} tokenData - Token data to store
 * @param {string} tokenData.token - The token string
 * @param {number} tokenData.credits - Number of credits
 * @param {number} tokenData.purchased_amount - Amount paid
 * @param {string} tokenData.package_type - Package type (starter/agency/pro)
 * @returns {boolean} Success status
 */
export async function storeToken(tokenData) {
  if (!supabase) {
    console.error('Supabase not available for token storage');
    return false;
  }

  try {
    const { error } = await supabase
      .from('tokens')
      .insert({
        token: tokenData.token,
        credits: tokenData.credits,
        purchased_amount: tokenData.purchased_amount,
        package_type: tokenData.package_type,
        email: tokenData.email  // ← ADD THIS LINE
      });

    if (error) {
      console.error('Supabase error storing token:', error);
      throw error;
    }
    
    console.log(`Token ${tokenData.token} stored with ${tokenData.credits} credits for ${tokenData.email}`);
    return true;
  } catch (error) {
    console.error('Error storing token:', error);
    return false;
  }
}