'use client'

import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from 'firebase/messaging';
import { useEffect, useState } from 'react';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
};

const firebaseApp = initializeApp(firebaseConfig);

interface RequestNotificationPermissionProps {
  onPermissionDenied: () => void;
}

export default function RequestNotificationPermission({ onPermissionDenied }: RequestNotificationPermissionProps) {
  const [permissionDenied, setPermissionDenied] = useState<boolean>(false);

  useEffect(() => {
    const requestPermission = async () => {
      const storedToken = localStorage.getItem('fcmToken');
      if (storedToken) {
        console.log(storedToken);
        return;
      }

      const permission = await Notification.requestPermission();
      if (permission === "granted") {
        const messaging = getMessaging(firebaseApp);
        const token = await getToken(messaging, { vapidKey: process.env.NEXT_PUBLIC_VAPID_KEY });
        console.log(token);
        localStorage.setItem('fcmToken', token);
      } else {
        setPermissionDenied(true);
        onPermissionDenied();
      }
    };

    requestPermission();
  }, [onPermissionDenied]);

  return (
    <>
      {permissionDenied && (
        <div className="mt-4 text-red-500">
          알림 권한이 필요합니다. 브라우저 설정에서 알림 권한을 허용해주세요.
        </div>
      )}
    </>
  );
}
