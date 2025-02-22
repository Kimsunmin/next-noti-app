"use client"

import { useState } from "react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { PageHeader } from "@/components/ui/page-header"

export default function HelpPage() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [openItem, setOpenItem] = useState<string | null>(null)

  const faqItems = [
    { id: "1", question: "알림은 어떻게 설정하나요?", description: "알림 설정 방법에 대해 알려드립니다." },
    { id: "2", question: "알림 시간을 변경하고 싶어요", description: "알림 시간을 변경하는 방법에 대해 알려드립니다." },
    { id: "3", question: "알림이 오지 않아요", description: "알림이 오지 않을 때 확인해야 할 사항을 안내합니다." },
    { id: "4", question: "앱 사용에 문제가 있어요", description: "앱 사용 중 발생하는 문제 해결 방법을 안내합니다." },
    { id: "5", question: "더 필요한 기능이 있어요!", description: "메일을 통해 전달 주시면 빠른 시간내로 확인 하겠습니다." },
  ]

  return (
    <>
      <PageHeader title="자주 묻는 질문" description="도움이 필요하신가요? 아래에서 확인 해보세요."/>

      <Accordion type="single" collapsible className="space-y-4">
        {faqItems.map((item) => (
          <AccordionItem key={item.id} value={item.id} className="border rounded-xl">
            <AccordionTrigger className="p-4 text-left font-medium">{item.question}</AccordionTrigger>
            <AccordionContent className="p-4 pt-0">
              {item.description}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </>
  )
}

