"use client"

import { useState } from "react"
import { ChevronRight } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"

export default function HelpPage() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [openItem, setOpenItem] = useState<string | null>(null)

  const faqItems = [
    { id: "1", question: "알림은 어떻게 설정하나요?" },
    { id: "2", question: "알림 시간을 변경하고 싶어요" },
    { id: "3", question: "알림이 오지 않아요" },
    { id: "4", question: "앱 사용에 문제가 있어요" },
  ]

  return (
    <>
      <section className="mb-6">
        <h2 className="text-2xl font-bold mb-2">자주 묻는 질문</h2>
        <p className="text-gray-600">도움이 필요하신가요? 아래 FAQ를 확인해보세요.</p>
      </section>

      <Accordion type="single" collapsible className="space-y-4">
        {faqItems.map((item) => (
          <AccordionItem key={item.id} value={item.id} className="border rounded-xl">
            <AccordionTrigger className="p-4 text-left font-medium">{item.question}</AccordionTrigger>
            <AccordionContent className="p-4 pt-0">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua.
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <section className="mt-8">
        <h3 className="font-medium mb-4">고객센터 연락하기</h3>
        <div className="space-y-3">
          <Button variant="outline" className="w-full justify-between">
            <span className="font-medium">이메일로 문의하기</span>
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button variant="outline" className="w-full justify-between">
            <span className="font-medium">전화 상담하기</span>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </section>
    </>
  )
}

