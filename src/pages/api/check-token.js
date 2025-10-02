import { getToken } from '../../utils/report';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { token } = req.query;

  if (!token) {
    return res.status(400).json({ error: 'Token required' });
  }

  try {
    const tokenData = await getToken(token);

    if (!tokenData) {
      return res.status(200).json({ valid: false, credits: 0 });
    }

    return res.status(200).json({
      valid: tokenData.credits > 0,
      credits: tokenData.credits
    });
  } catch (error) {
    console.error('Check token error:', error);
    return res.status(500).json({ error: 'Failed to check token' });
  }
}