'use client'

import React, { useEffect, useState } from 'react';
import { isSupported } from "firebase/messaging";
import { getClientFCMToken } from '../utils/clientFcm';


export default function NotificationManager() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [token, setToken] = useState<string | null>(null);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const currentToken = await getClientFCMToken();
        if (currentToken) {
          setToken(currentToken);
          localStorage.setItem("fcmToken", currentToken);
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
      {/* 알림 권한 및 토큰 상태를 표시할 수 있습니다 */}
    </div>
  );
}
