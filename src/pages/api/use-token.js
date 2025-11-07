import { useToken } from '../../utils/report';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { token, publicId } = req.body;

  if (!token || !publicId) {
    return res.status(400).json({ error: 'Token and publicId required' });
  }

  try {
    const result = await useToken(token, publicId);
    
    if (!result.success) {
      return res.status(400).json({ error: result.error });
    }

    return res.status(200).json(result);
  } catch (error) {
    console.error('Use token error:', error);
    return res.status(500).json({ error: 'Failed to process token' });
  }
}