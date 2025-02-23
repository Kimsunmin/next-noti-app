"use client"

import { useState } from "react"
import { Notification, NotificationSchema } from "@/types/notification"
import { Bell } from "lucide-react"
import { useRouter } from "next/navigation"

const initialNotifications: Notification[] = [
  {
    id: "1",
    title: "세탁기",
    type: "균일한 알림",
    time: 37,
    enabled: true,
  },
  {
    id: "2",
    title: "건조기",
    type: "균일한 알림",
    time: 60,
    enabled: true,
  },
  {
    id: "3",
    title: "햇반 1개",
    type: "한 번 알림",
    time: 2,
    enabled: true,
  },
  {
    id: "4",
    title: "세탁기 강력",
    type: "세 번 알림",
    time: 50,
    enabled: false,
  },
]

export default function NotificationList() {
  const [notifications, setNotifications] = useState(initialNotifications)
  const router = useRouter()

  const toggleNotification = (id: string) => {
    setNotifications(notifications.map((notif) => (notif.id === id ? { ...notif, enabled: !notif.enabled } : notif)))
  }

  const deleteNotification = (id: string) => {
    setNotifications(notifications.filter((notif) => notif.id !== id))
  }

  const navigateToCreateNotification = () => {
    router.push('/home');
  };

  return (
    <div className="space-y-4">
      {notifications.length === 0 ? (
        <div className="text-center mt-10">
          <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
            <Bell className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg text-black-500 mb-2">등록된 알림이 없습니다</h3>
          <p className="text-lg text-gray-500 mb-1 mt-2">새로운 알림을 추가해볼까요?</p>
          <button
            onClick={navigateToCreateNotification}
            className="mt-2 px-4 py-2 bg-black text-white rounded-lg"
          >
            + 알림 추가하기
          </button>
        </div>
      ) : (
        notifications.map((notif) => {
          const parsedNotification = NotificationSchema.safeParse(notif);
          if (!parsedNotification.success) {
            console.error(parsedNotification.error);
            return null;
          }

          return (
            <div
              key={notif.id}
              className="flex items-center justify-between p-3 bg-gray-100 rounded-xl cursor-pointer hover:bg-gray-200 transition-colors"
            >
              <div className="flex items-center gap-3 flex-1">
                <div className="w-10 h-10 rounded-xl bg-custom/10 flex items-center justify-center">
                  <i className="fa-regular fa-bell text-custom"></i>
                </div>
                <div className="flex-1">
                  <p className="font-medium">{notif.title}</p>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <span>{notif.type}</span>
                    <span>•</span>
                    <span>{notif.time}분</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={notif.enabled}
                    onChange={() => toggleNotification(notif.id)}
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-custom"></div>
                </label>
                <button className="text-red-500 hover:text-red-600" onClick={() => deleteNotification(notif.id)}>
                  <i className="fa-regular fa-trash-can"></i>
                </button>
              </div>
            </div>
          );
        })
      )}
    </div>
  )
}

