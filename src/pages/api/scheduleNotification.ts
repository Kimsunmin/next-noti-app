import { NextApiRequest, NextApiResponse } from 'next';
import { messaging } from '@/utils/fcm';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { to, notification, delay } = req.body;

    setTimeout(async () => {
      try {
        await messaging.send({
          token: to,
          notification,
        });
        res.status(200).json({ success: true });
      } catch (error) {
        res.status(500).json({ error: error });
      }
    }, delay);

  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
