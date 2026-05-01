'use client';

import { supabaseClient } from '@/store/supabase/client';

// import { createBrowserClientFn } from '@/store/supabase/client';

export default function LoginButton() {
  // const supabase = createBrowserClientFn();

  const handleKakaoLogin = async () => {
    await supabaseClient.auth.signInWithOAuth({
      provider: 'kakao',
      options: {
        // 인증 후 돌아올 우리 서비스의 callback 주소
        redirectTo: `${window.location.origin}/auth/callback`,
        //  queryParams: {
        //   access_type: 'offline',
        //   prompt: 'consent',
        // },
      },
    });
  };

  return <button onClick={handleKakaoLogin}>카카오로 로그인</button>;
}
