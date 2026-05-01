'use client';

import { useEffect } from 'react';

import { supabaseClient } from '@/store/supabase/client';

// import { createBrowserClientFn } from '@/store/supabase/client';

export default function LoginButton() {
  // const supabase = createBrowserClientFn();

  // useEffect(() => {
  //   const {
  //     data: { subscription },
  //   } = supabase.auth.onAuthStateChange((event, session) => {
  //     console.log('현재 인증 이벤트:', event);
  //     console.log('현재 세션 정보:', session);

  //     if (event === 'SIGNED_IN') {
  //       // 여기서 세션이 들어오는지 확인!
  //     }
  //   });

  //   return () => subscription.unsubscribe();
  // }, []);

  const handleGoogleLogin = async () => {
    await supabaseClient.auth.signInWithOAuth({
      provider: 'google',
      options: {
        // 인증 후 돌아올 주소 (중요!)
        redirectTo: `${window.location.origin}/auth/callback`,
        queryParams: {
          access_type: 'offline',
          prompt: 'consent',
        },
      },
    });
  };

  return <button onClick={handleGoogleLogin}>구글로 로그인</button>;
}
