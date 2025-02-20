'use client'

import { useState, ChangeEvent, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import RequestNotificationPermission from '@/components/RequestNotificationPermission';

export default function CreateNotification() {
  const [title, setTitle] = useState<string>('');
  const [body, setBody] = useState<string>('');
  const [delay, setDelay] = useState<number>(0);
  const [showRequestPermission, setShowRequestPermission] = useState<boolean>(false);
  const [permissionDenied, setPermissionDenied] = useState<boolean>(false);
  const router = useRouter();

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleBodyChange = (e: ChangeEvent<HTMLInputElement>) => {
    setBody(e.target.value);
  };

  const handleDelayChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDelay(Number(e.target.value));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setShowRequestPermission(true);

    const response = await fetch('/api/notifications', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, body, delay }),
    });

    if (response.ok) {
      console.log('Notification saved');
      router.push('/notification/list');
    } else {
      console.error('Failed to save notification');
    }

    console.log(`제목: ${title}, 내용: ${body}, 지연 시간: ${delay} 분`);
  };

  const handlePermissionDenied = () => {
    setPermissionDenied(true);
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-gray-700 p-8 rounded-lg shadow-lg text-white w-full max-w-md">
        <main className="flex flex-col gap-8 items-center sm:items-start">
          <h1 className="text-2xl font-bold">알림 생성</h1>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
            <label className="w-full">
              제목:
              <input
                type="text"
                value={title}
                onChange={handleTitleChange}
                className="mt-1 px-2 py-1 border rounded w-full text-black"
              />
            </label>
            <label className="w-full">
              내용:
              <input
                type="text"
                value={body}
                onChange={handleBodyChange}
                className="mt-1 px-2 py-1 border rounded w-full text-black"
              />
            </label>
            <label className="w-full">
              지연 시간 (분):
              <input
                type="number"
                value={delay}
                onChange={handleDelayChange}
                className="mt-1 px-2 py-1 border rounded w-full text-black"
              />
            </label>
            <button
              type="submit"
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded w-full"
            >
              알림 생성
            </button>
          </form>
          {showRequestPermission && <RequestNotificationPermission onPermissionDenied={handlePermissionDenied} />}
          {permissionDenied && <p className="text-red-500">알림 권한이 거부되었습니다. 다시 요청해 주세요.</p>}
        </main>
      </div>
    </div>
  );
}