'use client'

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface Notification {
  title: string;
  body: string;
  delay: number;
}

export default function NotificationList() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    const fetchNotifications = async () => {
      const response = await fetch(`/api/notifications?page=${page}`);
      const data = await response.json();
      if (data.notifications.length > 0) {
        setNotifications((prev) => [...prev, ...data.notifications]);
      } else {
        setHasMore(false);
      }
    };

    fetchNotifications();
  }, [page]);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, clientHeight, scrollHeight } = e.currentTarget;
    if (scrollHeight - scrollTop === clientHeight && hasMore) {
      setPage((prev) => prev + 1);
    }
  };

  const navigateToCreateNotification = () => {
    router.push('/notification/create');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8">
      <h1 className="text-2xl font-bold mb-4">알림 목록</h1>
      <div
        className="grid gap-4 w-full max-w-md overflow-y-auto"
        style={{ maxHeight: 'calc(100vh - 200px)' }}
        onScroll={handleScroll}
      >
        {notifications.map((notification, index) => (
          <div key={index} className="bg-gray-700 p-4 rounded-lg shadow-lg text-white cursor-pointer">
            <h2 className="text-xl font-semibold">{notification.title}</h2>
            <p>{notification.body}</p>
            <p className="text-sm text-gray-400">지연 시간: {notification.delay} 분</p>
          </div>
        ))}
      </div>
      <button
        onClick={navigateToCreateNotification}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
      >
        알림 생성
      </button>
    </div>
  );
}
