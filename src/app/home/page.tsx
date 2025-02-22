'use client'

import NotificationForm from "@/components/NotificationForm";
import { PageHeader } from "@/components/ui/page-header";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function Home() {
  const router = useRouter();

  const handleCreateNotification = (title: string, type: string, delay: number) => {
    router.push('/notifications');
    toast(`${title}, ${delay}분 뒤에 알려드릴게요!`, {description: '알림 목록에서 알림을 끄거나 삭제 할 수 있어요!'});
  }

  return (
    <>
      <PageHeader title="알림 만들기" description="아래에서 알림을 만들어 주세요." />

      <NotificationForm onSubmit={handleCreateNotification} />
    </>
  );
}
