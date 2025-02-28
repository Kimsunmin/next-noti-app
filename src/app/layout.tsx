import type { Metadata } from "next";
import "./globals.css";
import ClientLayout from "@/app/ClientLayout";

export const metadata: Metadata = {
  title: "Notification",
  description: "Notification",
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Notification'
  },
  icons: {
    apple: [
      {
        url: '/icons/ios/apple-touch-icon.png',
      },
      {
        url: '/icons/ios/AppIcon@3x.png',
        sizes: '180x180',
        type: 'image/png',
      }
    ]
  }

};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <ClientLayout>{children}</ClientLayout>
    </>
  );
}

