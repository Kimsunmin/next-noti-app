import { getMessaging, getToken, isSupported } from "firebase/messaging";
import { initializeApp } from "firebase/app";

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

export async function getClientFCMToken(): Promise<string> {
  const tokenKey = "fcmToken";
  let fcmToken = localStorage.getItem(tokenKey);

  if (!fcmToken) {
    const supported = await isSupported();
    if (!supported) {
      throw new Error("This browser does not support notifications.");
    }

    const messaging = getMessaging(firebaseApp);
    fcmToken = await getToken(messaging, { vapidKey: process.env.NEXT_PUBLIC_VAPID_KEY });

    if (!fcmToken) {
      throw new Error("No registration token available. Request permission to generate one.");
    }

    localStorage.setItem(tokenKey, fcmToken);
  }

  return fcmToken;
}
