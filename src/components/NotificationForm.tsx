"use client"

import { useState } from "react"

export default function NotificationForm() {
  const [notificationEnabled, setNotificationEnabled] = useState(true)
  const [title, setTitle] = useState("")
  const [type, setType] = useState("일일 업데이트")
  const [time, setTime] = useState("09:00")

  return (
    <section className="bg-white rounded-2xl shadow-sm p-4 mb-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-medium mb-1">알림 상태</h3>
          <p className="text-sm text-gray-500">업데이트 수신을 활성화</p>
        </div>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            className="sr-only peer"
            checked={notificationEnabled}
            onChange={(e) => setNotificationEnabled(e.target.checked)}
          />
          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-custom"></div>
        </label>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">알림 제목</label>
          <input
            type="text"
            className="w-full h-12 px-4 bg-gray-50 rounded-xl border-none text-sm"
            placeholder="알림 제목을 입력하세요"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="mt-4">
          <label className="block text-sm font-medium mb-2">알림 유형</label>
          <select
            className="w-full h-12 px-4 bg-gray-50 rounded-xl border-none text-sm"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option>일일 업데이트</option>
            <option>주간 요약</option>
            <option>중요 알림</option>
          </select>
        </div>
        <div className="mt-4">
          <label className="block text-sm font-medium mb-2">알림 시간</label>
          <input
            type="time"
            className="w-full h-12 px-4 bg-gray-50 rounded-xl border-none text-sm"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />
        </div>
      </div>
    </section>
  )
}

