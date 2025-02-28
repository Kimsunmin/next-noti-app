"use client"

import { PlusCircle } from "lucide-react";
import { useState } from "react"
import { NotificationSchema, NotificationTypes, NotificationType } from "@/types/notification"
import { toast } from "sonner";
import { addNotification } from "@/utils/indexedDB";
import { v4 as uuidv4 } from 'uuid';
import { sendFCM, getFCMToken } from "@/utils/fcm";

interface NotificationFormProps {
  onSubmit: (title: string, type: string, delay: number) => void;
}

export default function NotificationForm({ onSubmit }: NotificationFormProps) {
  const [notificationEnabled, setNotificationEnabled] = useState(true)
  const [title, setTitle] = useState("")
  const [type, setType] = useState<NotificationType>(NotificationTypes.ONCE)
  const [delay, setDelay] = useState(5)
  const [customDelay, setCustomDelay] = useState(5)
  const [useCustomInput, setUseCustomInput] = useState(false)

  const handleDelayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDelay(Number(e.target.value))
  }

  const handleCustomDelayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomDelay(Number(e.target.value))
  }

  const toggleCustomInput = () => {
    setUseCustomInput(!useCustomInput)
  }

  const handleSubmit = async () => {
    const finalDelay = useCustomInput ? customDelay : delay;
    const notification = { id: uuidv4(), title, type, time: finalDelay, enabled: notificationEnabled };

    const result = NotificationSchema.safeParse(notification);
    if (!result.success) {
      toast.error("알림 생성 실패", { description: result.error.errors.map(e => e.message).join(", ") });
      return;
    }

    await addNotification(notification);
    onSubmit(title, type, finalDelay);

    // FCM 발송
    try {
      const fcmToken = await getFCMToken();
      const message = {
        to: fcmToken,
        notification: {
          title: "새 알림",
          body: `알림 제목: ${title}, 알림 유형: ${type}, 알림 시간: ${finalDelay}분 후`,
        },
      };

      await sendFCM(message);
      toast.success("FCM 발송 성공");
    } catch (error) {
      toast.error("FCM 발송 실패", { description: (error as Error).message });
    }
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
            onChange={(e) => setType(e.target.value as NotificationType)}
          >
            {Object.values(NotificationTypes).map((notificationType) => (
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

