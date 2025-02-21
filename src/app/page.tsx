'use client'

import NotificationForm from "@/components/NotificationForm";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const navigateToCreateNotification = () => {
    router.push('/notification/create');
  };

  const handleCreateNotification = () => {
    router.push('/login');
  }

  return (
    <>
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-2">알림을 만들어 보세요, Foo님!</h2>
        <p className="text-gray-600">아래에서 알림 설정을 해주세요</p>
      </section>

      <NotificationForm />

      <button className="w-full h-12 bg-custom text-white font-medium rounded-xl !rounded-button flex items-center justify-center gap-2 mb-8" onClick={handleCreateNotification}>
        <i className="fa-regular fa-plus"></i>
        <span>새 알림 등록</span>
      </button>
    </>
  );
}
