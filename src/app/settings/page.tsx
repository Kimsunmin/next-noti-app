"use client"

import { User, Bell, HelpCircle, FileText, Info, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function SettingsPage() {
  return (
    <>
      <section className="mb-6">
        <h2 className="text-2xl font-bold mb-2">설정</h2>
      </section>

      <div className="space-y-4">
        <Button variant="outline" className="w-full justify-between">
          <div className="flex items-center gap-3">
            <User className="h-5 w-5 text-gray-600" />
            <span className="font-medium">계정 정보</span>
          </div>
          <ChevronRight className="h-4 w-4 text-gray-400" />
        </Button>

        <Button variant="outline" className="w-full justify-between">
          <div className="flex items-center gap-3">
            <Bell className="h-5 w-5 text-gray-600" />
            <span className="font-medium">알림 설정</span>
          </div>
          <ChevronRight className="h-4 w-4 text-gray-400" />
        </Button>

        <Button variant="outline" className="w-full justify-between">
          <div className="flex items-center gap-3">
            <HelpCircle className="h-5 w-5 text-gray-600" />
            <span className="font-medium">고객센터</span>
          </div>
          <ChevronRight className="h-4 w-4 text-gray-400" />
        </Button>

        <Button variant="outline" className="w-full justify-between">
          <div className="flex items-center gap-3">
            <FileText className="h-5 w-5 text-gray-600" />
            <span className="font-medium">약관 및 정책</span>
          </div>
          <ChevronRight className="h-4 w-4 text-gray-400" />
        </Button>

        <div className="flex items-center justify-between p-4 bg-white rounded-xl border border-gray-100">
          <div className="flex items-center gap-3">
            <Info className="h-5 w-5 text-gray-600" />
            <span className="font-medium">앱 정보</span>
          </div>
          <span className="text-sm text-gray-400">v1.0.0</span>
        </div>
      </div>

      <Button variant="ghost" className="w-full p-4 mt-8 text-red-500 font-medium">
        로그아웃
      </Button>
    </>
  )
}

