'use client'

import { createBrowserClient } from '@supabase/ssr'
import { useRouter } from 'next/navigation'

export default function LogoutButton() {
   const router = useRouter()

   // 클라이언트 사이드 슈파베이스 객체 생성
   const supabase = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
   )

   const handleLogout = async () => {
      // 1. 슈파베이스 로그아웃 호출 (쿠키 및 세션 삭제)
      const { error } = await supabase.auth.signOut()

      if (error) {
         console.error('로그아웃 중 에러 발생:', error.message)
         return
      }

      // 2. 로그아웃 후 메인 페이지나 로그인 페이지로 이동
      // AuthProvider가 자동으로 Zustand의 user를 null로 바꿀 것입니다.
      router.push('/login')
      router.refresh() // 서버 컴포넌트들의 데이터를 최신화하기 위해 권장
   }

   return (
      <button
         onClick={handleLogout}
         className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
      >
         로그아웃
      </button>
   )
}



// useUserStore에 clearUser 같은 함수가 있다면
// const clearUser = useUserStore((state) => state.clearUser)

// const handleLogout = async () => {
//   await supabase.auth.signOut()
//   clearUser() // 즉시 스토어 비우기
//   router.push('/login')
// }