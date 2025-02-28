import type { NextApiRequest, NextApiResponse } from 'next';
import { messaging } from '@/utils/fcm';

interface FCMMessage {
  to: string;
  notification: {
    title: string;
    body: string;
  };
  data?: { [key: string]: string };
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { to, notification, data }: FCMMessage = req.body;

    try {
      const response = await messaging.send({
        token: to,
        notification,
        data,
      });
      res.status(200).json({ success: true, response });
    } catch (error) {
      res.status(500).json({ success: false, error: error });
    }
  } else {
    res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }
}
