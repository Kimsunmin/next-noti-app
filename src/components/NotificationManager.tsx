'use client'

import React, { useEffect, useState } from 'react';
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, isSupported } from "firebase/messaging";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

const firebaseApp = initializeApp(firebaseConfig);

export default function NotificationManager() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [token, setToken] = useState<string | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const messaging = getMessaging(firebaseApp);
        const currentToken = await getToken(messaging, { vapidKey: process.env.NEXT_PUBLIC_VAPID_KEY });
        if (currentToken) {
          setToken(currentToken);
        } else {
          setError('No registration token available. Request permission to generate one.');
        }
      } catch (err) {
        setError(`An error occurred while retrieving token. ${err}`);
      }
    };

    const checkNotificationPermission = async () => {
      const supported = await isSupported();
      if (!supported) {
        setError('This browser does not support notifications.');
        return;
      }

      if (Notification.permission === 'granted') {
        await fetchToken();
      } else if (Notification.permission !== 'denied') {
        const permission = await Notification.requestPermission();
        if (permission === 'granted') {
          await fetchToken();
        } else {
          setError('Notification permission denied');
        }
      } else {
        setError('Notification permission denied');
      }
    };

    checkNotificationPermission();
  }, []);

  return (
    <div>

    </div>
  );
}
