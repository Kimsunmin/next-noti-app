'use client'

import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from 'firebase/messaging';
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    if (Notification.permission === "granted") {
      getFCMPushKey();
    }
  }, []);

  const requestNotificationPermission = async () => {
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      getFCMPushKey();
    }
  };

  const getFCMPushKey = async () => {
    const firebaseConfig = {
      apiKey: process.env.FIREBASE_API_KEY,
      authDomain: process.env.FIREBASE_AUTH_DOMAIN,
      projectId: process.env.FIREBASE_PROJECT_ID,
      storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
      appId: process.env.FIREBASE_APP_ID,
      measurementId: process.env.FIREBASE_MEASUREMENT_ID
    };

    const firebaseApp = initializeApp(firebaseConfig);

    const messaging = getMessaging(firebaseApp);
    const token = await getToken(messaging, { vapidKey: process.env.VAPID_KEY });
    console.log(token);
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <ol className="list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
          <li className="mb-2">
            알림을 만들어 보자!
            <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-semibold">
              src/app/page.tsx
            </code>
            .
          </li>
          <li>푸시 알림을 받아 보자아아!</li>
        </ol>
        <button
          onClick={requestNotificationPermission}
          className="mt-4 px-4 py-2 bg-gray-500 text-white rounded"
        >
          Request Notification Permission
        </button>
      </main>
    </div>
  );
}
