import type { Metadata } from "next";
import "./globals.css";
import ClientLayout from "@/app/ClientLayout";

export const metadata: Metadata = {
  title: "Notification",
  description: "Notification",
  manifest: '/manifest.json',
  other: {
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "default",
    "apple-mobile-web-app-title": "Simple QR Code Utils",
  },
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
  )
}

