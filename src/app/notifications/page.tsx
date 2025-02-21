import NotificationList from "@/app/notifications/NotificationList";

export default function NotificationsPage() {
  return (
    <>
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-2">알림을 확인하세요, Foo님!</h2>
        <p className="text-gray-600">아래에서 알림 설정을 해주세요</p>
      </section>

      <section className="block">
        <h3 className="font-medium mb-4">등록된 알림</h3>
        <NotificationList />
      </section>
    </>
  )
}

