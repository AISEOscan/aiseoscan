// API endpoint for fetching report data
import { getReport, getReportExpiryTime } from '../../../utils/report';

export default async function handler(req, res) {
  console.log('========== REPORT API DEBUGGING ==========');
  console.log(`Report API endpoint hit`);
  console.log(`Request path: ${req.url}`);
  console.log(`ID from query: ${req.query.id}`);
  
  // Only accept GET requests
  if (req.method !== 'GET') {
    console.log(`Rejected method: ${req.method}`);
    return res.status(405).json({ error: 'Method not allowed' });
  }
  
  try {
    const { id } = req.query;
    
    console.log(`API request for report with ID: ${id}`);
    
    // Get the report data
    const report = await getReport(id);
    
    // Check if report exists
    if (!report) {
      console.log(`Report ${id} not found`);
      return res.status(404).json({ error: 'Report not found' });
    }
    
    console.log(`Successfully retrieved report ${id} with status: ${report.status}`);
    
    // Get expiry time
    const expiryTime = await getReportExpiryTime(id);
    
    // Return the report with expiry time
    return res.status(200).json({
      ...report,
      expiryTime
    });
  } catch (error) {
    console.error('Report API error:', error);
    return res.status(500).json({ error: 'Failed to fetch report', details: error.message });
  }
}