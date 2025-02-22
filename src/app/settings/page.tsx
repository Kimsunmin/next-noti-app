"use client"

import { Bell, HelpCircle, FileText, Info, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { PageHeader } from "@/components/ui/page-header"

export default function SettingsPage() {
  return (
    <>
      <PageHeader title="설정" description="앱 설정을 관리하세요" />

      <div className="space-y-4">
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
    </>
  )
}

