"use client"

import type React from "react"
import { Pacifico } from "next/font/google"
import "./globals.css"
import Link from 'next/link'
import { usePathname } from "next/navigation"
import { Settings, BadgeHelp, AlarmClock, House, User } from "lucide-react"
import { Toaster } from "@/components/ui/sonner"
import PWAPrompt from "@/components/PWAPrompt"
import NotificationManager from "@/components/NotificationManager"
import { useEffect } from "react"

const pacifico = Pacifico({ subsets: ["latin"], weight: ["400"] })

function Header() {
  const pathname = usePathname()
  const isLoginPage = pathname === "/login"

  return (
    <header className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md z-50 border-b border-gray-100">
      <nav className="max-w-[375px] mx-auto px-4 h-14 flex items-center justify-between">
        <h1 className={`${pacifico.className} text-xl text-custom `}>Brand B</h1>
        {!isLoginPage && (
          <div className="flex items-center gap-4">
            <button className="w-8 h-8 rounded-full flex items-center justify-center bg-gray-100">
              <User className="fa-regular fa-user text-gray-600"/>
            </button>
          </div>
        )}
      </nav>
    </header>
  )
}

export function Footer() {

  const FooterComponent = () => {
    const pathname = usePathname()

    if (pathname === '/' || pathname === '/login') return null

    return (
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100">
        <div className="max-w-[375px] mx-auto grid grid-cols-4 h-16">
          <Link
            href="/home"
            className={`flex flex-col items-center justify-center gap-1 ${pathname === "/home" ? "text-custom " : "text-gray-400 "}`}
          >
            <House className={`fa-regular fa-house ${pathname === "/home" ? "text-custom " : "text-gray-400 "}`} />
            <span className="text-xs">홈</span>
          </Link>
          <Link
            href="/notifications"
            className={`flex flex-col items-center justify-center gap-1 ${pathname === "/notifications" ? "text-custom " : "text-gray-400 "}`}
          >
            <AlarmClock className={`fa-regular fa-bell ${pathname === "/notifications" ? "text-custom " : "text-gray-400 "}`} />
            <span className="text-xs">알림</span>
          </Link>
          <Link
            href="/help"
            className={`flex flex-col items-center justify-center gap-1 ${pathname === "/help" ? "text-custom " : "text-gray-400 "}`}
          >
            <BadgeHelp
              className={`fa-regular fa-circle-question ${pathname === "/help" ? "text-custom " : "text-gray-400 "}`}
            />
            <span className="text-xs">도움말</span>
          </Link>
          <Link
            href="/settings"
            className={`flex flex-col items-center justify-center gap-1 ${pathname === "/settings" ? "text-custom " : "text-gray-400 "}`}
          >
            <Settings className={`fa-regula fa-solid fa-gear ${pathname === "/settings" ? "text-custom " : "text-gray-400 "}`} />
            <span className="text-xs">설정</span>
          </Link>
        </div>
      </nav>
    )
  }

  return <FooterComponent />
}

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/firebase-messaging-sw.js")
        .then((registration) => {
          console.log("Service Worker registered with scope:", registration.scope);
        })
        .catch((error) => {
          console.error("Service Worker registration failed:", error);
        });
    }
  }, []);

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" rel="stylesheet" />
      </head>
      <body className={`bg-gray-50 ${pacifico.className}`}>
        <div className="max-w-[375px] mx-auto min-h-screen relative pb-16">
          <Header />
          <main className="pt-20 px-4">{children}</main>
          <Toaster />
          <Footer />
          <PWAPrompt />
          <NotificationManager />
        </div>
      </body>
    </html>
  )
}