// src/pages/api/update-report-payment.js

import { getReport, storeReport } from '../../utils/report';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { reportId, sessionId } = req.body;

  if (!reportId || !sessionId) {
    return res.status(400).json({ error: 'Missing required fields: reportId and sessionId are needed' });
  }

  try {
    const report = await getReport(reportId);

    if (!report) {
      return res.status(404).json({ error: 'Report not found' });
    }

    // Only update if it's still awaiting_payment and sessionId hasn't been saved yet
    if (report.status === 'awaiting_payment' && !report.paymentSessionId) {
      const updated = {
        ...report,
        paymentSessionId: sessionId
      };

      await storeReport(updated);
      return res.status(200).json({ message: 'Session ID updated successfully' });
    }

    return res.status(200).json({ message: 'No update needed' });
  } catch (error) {
    console.error('Failed to update paymentSessionId:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

