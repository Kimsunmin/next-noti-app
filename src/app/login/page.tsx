'use client'

import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  
  return (
    <>
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-2">Welcome!</h2>
        <p className="text-gray-600">서비스 이용을 위해 로그인해주세요</p>
      </section>
      <div className="space-y-4">
        <Button className="w-full h-12 bg-[#FEE500] hover:bg-[#FDD800] text-black transition-colors">
          <span className="font-medium">카카오로 시작하기</span>
        </Button>
        <Button
          variant="outline"
          className="w-full h-12"
          onClick={() => {
            alert("주의: 게스트 로그인 시 로그아웃이나 앱 삭제 후에는 데이터 복구가 불가능합니다.")
            router.push('/notifications')
          }
        }
        >
          <i className="fa-regular fa-user text-gray-600 mr-2"></i>
          <span className="font-medium">게스트로 시작하기</span>
        </Button>
      </div>
    </>
  )
}
