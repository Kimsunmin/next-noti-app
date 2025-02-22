import NotificationList from "@/app/notifications/NotificationList";
import { PageHeader } from "@/components/ui/page-header";

export default function NotificationsPage() {
  return (
    <>
      <PageHeader title="등록된 알림 목록" description="아래에서 알림을 확인해보세요."/>

      <section className="block">
        <h3 className="font-medium mb-4">등록된 알림</h3>
        <NotificationList />
      </section>
    </>
  )
}

