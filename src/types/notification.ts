import { z } from "zod";

export const NotificationTypes = ["한 번 알림", "균일한 알림", "마지막 쯤 알림", "세 번 알림"] as const;

export const NotificationSchema = z.object({
  id: z.string(),
  title: z.string().min(1, "알림 제목을 입력하세요"),
  type: z.enum(NotificationTypes),
  time: z.number().min(1, "알림 시간은 1분 이상이어야 합니다").max(60, "알림 시간은 60분 이하이어야 합니다"),
  enabled: z.boolean(),
}).required();

export type Notification = z.infer<typeof NotificationSchema>;
export type NotificationType = typeof NotificationTypes[number];
