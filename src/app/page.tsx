'use client'

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const navigateToCreateNotification = () => {
    router.push('/notification/create');
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-gray-700 p-8 rounded-lg shadow-lg text-white w-full max-w-md">
        <main className="flex flex-col gap-8 items-center sm:items-start">
          <h1 className="text-2xl font-bold">알림 생성기</h1>
          <p className="text-center sm:text-left">
            이 웹 애플리케이션을 사용하면 쉽게 알림을 생성하고 예약할 수 있습니다.
          </p>
          <button
            onClick={navigateToCreateNotification}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
          >
            시작하기
          </button>
        </main>
      </div>
    </div>
  );
}
