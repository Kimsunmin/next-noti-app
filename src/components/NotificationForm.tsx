"use client"

import { PlusCircle } from "lucide-react";
import { useState } from "react"

interface NotificationFormProps {
  onSubmit: (title: string, type: string, delay: number) => void;
}

export default function NotificationForm({ onSubmit }: NotificationFormProps) {
  const [notificationEnabled, setNotificationEnabled] = useState(true)
  const [title, setTitle] = useState("")
  const [type, setType] = useState("한 번 알림")
  const [delay, setDelay] = useState(5)
  const [customDelay, setCustomDelay] = useState(5)
  const [useCustomInput, setUseCustomInput] = useState(false)

  const notificationTypes = ["한 번 알림", "균일한 알림", "마지막 쯤 알림", "세 번 알림"]

  const handleDelayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDelay(Number(e.target.value))
  }

  const handleCustomDelayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomDelay(Number(e.target.value))
  }

  const toggleCustomInput = () => {
    setUseCustomInput(!useCustomInput)
  }

  const handleSubmit = () => {
    const finalDelay = useCustomInput ? customDelay : delay;
    onSubmit(title, type, finalDelay);
  }

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
            {notificationTypes.map((notificationType) => (
              <option key={notificationType} value={notificationType}>
                {notificationType}
              </option>
            ))}
          </select>
        </div>
        <div className="mt-4">
          <label className="block text-sm font-medium mb-2">알림 시간 (분)</label>
          {!useCustomInput ? (
            <>
              <input
                type="range"
                min="1"
                max="60"
                step="5"
                value={delay}
                onChange={handleDelayChange}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-gray-500">
                <span>1분</span>
                <span>60분</span>
              </div>
              <div className="text-center mt-2 text-sm text-gray-700">
                현재 설정 시간: {delay}분
              </div>
              <button
                type="button"
                className="mt-2 w-full h-12 px-4 bg-gray-50 rounded-xl border-none text-sm font-medium text-red-500"
                onClick={toggleCustomInput}
              >
                직접 입력
              </button>
            </>
          ) : (
            <>
              <input
                type="number"
                min="1"
                max="60"
                value={customDelay}
                onChange={handleCustomDelayChange}
                className="w-full h-12 px-4 bg-gray-50 rounded-xl border-none text-sm mt-2"
                placeholder="직접 입력 (1-60분)"
              />
              <button
                type="button"
                className="mt-2 w-full h-12 px-4 bg-gray-50 rounded-xl border-none text-sm font-medium text-blue-500"
                onClick={toggleCustomInput}
              >
                슬라이더 사용
              </button>
            </>
          )}
        </div>
        <button
          type="button"
          className="mt-4 w-full h-12 bg-custom text-white rounded-xl text-sm font-medium"
          onClick={handleSubmit}
        >
          <PlusCircle className="w-6 h-6 inline-block mr-2" />
          <span>새 알림 등록</span>
        </button>
      </div>
    </section>
  )
}

