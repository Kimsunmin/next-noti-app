'use client'

import { useRouter } from "next/navigation";
import { PageHeader } from "@/components/ui/page-header";
import { Button } from "@/components/ui/button";

export default function Home() {
  const router = useRouter();

  const navigateToHome = () => {
    router.push('/home');
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8">
      <PageHeader title="간단 알림 등록" description="일상 속 반복되는 알림을 간편하게 관리하세요!" />
      <div className="space-y-4 text-center">
        <p>세탁기 알림, 약 복용 시간, 운동 시간 등 반복되는 일정을 놓치지 마세요.</p>
        <div className="w-full h-48 bg-gray-300 rounded-lg"></div>
        <p>알림 유형에 따라 10분 전, 5분 전, 1분 전 등 원하는 시간에 알림을 받을 수 있습니다.</p>
        <div className="w-full h-48 bg-gray-300 rounded-lg"></div>
        <p>지금 바로 시작해서 일정을 더 효율적으로 관리해보세요!</p>
        <div className="w-full h-48 bg-gray-300 rounded-lg"></div>
      </div>
      <Button variant="default" className="mt-8 px-6 py-3 text-lg font-semibold" onClick={navigateToHome}>
        지금 시작하기
      </Button>
    </div>
  );
}
