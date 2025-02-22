import { NextRequest, NextResponse } from "next/server";

const notifications: { title: string; body: string; delay: number }[] = [];

export async function POST(req: NextRequest) {
  const { title, body, delay } = await req.json();
  notifications.push({ title, body, delay });
  return NextResponse.json({ message: "Notification saved" }, { status: 200 });
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get('page') || '1', 10);
  const pageSize = 5;
  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  const paginatedNotifications = notifications.slice(start, end);
  return NextResponse.json({ notifications: paginatedNotifications }, { status: 200 });
}
