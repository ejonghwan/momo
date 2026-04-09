'use client'

import { createClient } from '@/utils/supabase/client'


export default function LoginButton() {
  const supabase = createClient()

  const handleKakaoLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'kakao',
      options: {
        // 인증 후 돌아올 우리 서비스의 callback 주소
        redirectTo: `${window.location.origin}/auth/callback`,
         queryParams: {
          access_type: 'offline',
          prompt: 'consent',
        },
      },
    })
  }

  return (
    <button 
      onClick={handleKakaoLogin}
    >
      카카오로 로그인
    </button>
  )
}