"use client"

import { usePathname } from 'next/navigation'
import Link from 'next/link'

export default function Footer() {

  const FooterComponent = () => {
    const pathname = usePathname()
    const isLoginPage = pathname === "/login"

    if (isLoginPage) return null

    return (
      <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-100 dark:border-gray-700">
        <div className="max-w-[375px] mx-auto grid grid-cols-4 h-16">
          <Link
            href="/"
            className={`flex flex-col items-center justify-center gap-1 ${pathname === "/" ? "text-custom " : "text-gray-400 "}`}
          >
            <i
              className={`fa-solid fa-house ${pathname === "/" ? "text-custom " : "text-gray-400 "}`}
            ></i>
            <span className="text-xs">홈</span>
          </Link>
          <Link
            href="/notifications"
            className={`flex flex-col items-center justify-center gap-1 ${pathname === "/notifications" ? "text-custom " : "text-gray-400 "}`}
          >
            <i
              className={`fa-regular fa-bell ${pathname === "/notifications" ? "text-custom " : "text-gray-400 "}`}
            ></i>
            <span className="text-xs">알림</span>
          </Link>
          <Link
            href="/help"
            className={`flex flex-col items-center justify-center gap-1 ${pathname === "/help" ? "text-custom " : "text-gray-400 "}`}
          >
            <i
              className={`fa-regular fa-circle-question ${pathname === "/help" ? "text-custom " : "text-gray-400 "}`}
            ></i>
            <span className="text-xs">도움말</span>
          </Link>
          <Link
            href="/settings"
            className={`flex flex-col items-center justify-center gap-1 ${pathname === "/settings" ? "text-custom " : "text-gray-400 "}`}
          >
            <i
              className={`fa-regular fa-gear ${pathname === "/settings" ? "text-custom " : "text-gray-400 "}`}
            ></i>
            <span className="text-xs">설정</span>
          </Link>
        </div>
      </nav>
    )
  }

  return <FooterComponent />
}