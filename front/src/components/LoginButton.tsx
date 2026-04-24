'use client'

import { createClient } from '@/utils/supabase/client'


export default function LoginButton() {
  const supabase = createClient()

  const handleGoogleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        // 인증 후 돌아올 주소 (중요!)
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
      onClick={handleGoogleLogin}
    >
      구글로 로그인
    </button>
  )
}