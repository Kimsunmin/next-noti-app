"use client"

import { useState } from "react"

type Notification = {
  id: string
  title: string
  type: string
  time: string
  icon: string
  enabled: boolean
}

const initialNotifications: Notification[] = [
  {
    id: "1",
    title: "세탁기",
    type: "일일 업데이트",
    time: "37분",
    icon: "fa-regular fa-bell",
    enabled: true,
  },
  {
    id: "2",
    title: "건조기",
    type: "일일 업데이트",
    time: "60분",
    icon: "fa-regular fa-chart-bar",
    enabled: true,
  },
  {
    id: "3",
    title: "햇반 1개",
    type: "주간 요약",
    time: "2분",
    icon: "fa-regular fa-chart-bar",
    enabled: true,
  },
  {
    id: "4",
    title: "세탁기 강력",
    type: "주간 요약",
    time: "50분",
    icon: "fa-regular fa-chart-bar",
    enabled: false,
  },
]

export default function NotificationList() {
  const [notifications, setNotifications] = useState(initialNotifications)

  const toggleNotification = (id: string) => {
    setNotifications(notifications.map((notif) => (notif.id === id ? { ...notif, enabled: !notif.enabled } : notif)))
  }

  const deleteNotification = (id: string) => {
    setNotifications(notifications.filter((notif) => notif.id !== id))
  }

  return (
    <div className="space-y-4">
      {notifications.map((notif) => (
        <div
          key={notif.id}
          className="flex items-center justify-between p-3 bg-gray-50 rounded-xl cursor-pointer hover:bg-gray-100 transition-colors"
        >
          <div className="flex items-center gap-3 flex-1">
            <div className="w-10 h-10 rounded-xl bg-custom/10 flex items-center justify-center">
              <i className={`${notif.icon} text-custom`}></i>
            </div>
            <div className="flex-1">
              <p className="font-medium">{notif.title}</p>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <span>{notif.type}</span>
                <span>•</span>
                <span>{notif.time}</span>
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
      ))}
    </div>
  )
}

