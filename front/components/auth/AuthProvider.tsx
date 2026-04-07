'use client'

import { useEffect } from 'react'
import { useUserStore } from '@/store/front/useUserStore'
import { createBrowserClient } from '@supabase/ssr'

const AuthProvider = ({ serverUser, children }: { serverUser: any, children: React.ReactNode }) => {
   const setUser = useUserStore((state) => state.setUser)

   useEffect(() => {
      // 1. 서버에서 넘겨준 초기 유저 정보 저장
      setUser(serverUser)

      // 2. 클라이언트에서 세션 변화 감지 (로그아웃 등)
      const supabase = createBrowserClient(
         process.env.NEXT_PUBLIC_SUPABASE_URL!,
         process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      )

      const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
         if (event === 'SIGNED_IN') setUser(session?.user ?? null)
         if (event === 'SIGNED_OUT') setUser(null)
      })

      return () => subscription.unsubscribe()
   }, [serverUser, setUser])

   return <>{children}</>
}

export default AuthProvider