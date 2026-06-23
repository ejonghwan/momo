'use client';

import { useEffect, useState } from 'react';

// import router from 'next/router';
import { createBrowserClient } from '@supabase/ssr';
import { User } from '@supabase/supabase-js'; // Supabase 제공 타입 임포트

import { DEFAULT_CATEGORIES } from '@/constants/category';

export default function TermsPage() {
  const [user, setUser] = useState<User | null>(null);
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );

  useEffect(() => {
    const getUser = async () => {
      // 쿠키에 세션이 있으므로 바로 가져올 수 있습니다.
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
    };
    getUser();
  }, []);

  const handleAgree = async () => {
    if (!user) return;

    console.log('user????????????????????', user);

    // 약관 동의 후 public.users에 저장
    const { error } = await supabase.from('users').insert({
      id: user.id,
      email: user.email,
      nickname: user.user_metadata.full_name || user.user_metadata.name,
      avatar_url: user.user_metadata.avatar_url,
      provider: user.app_metadata.provider,
      role: 'user',
      created_at: user.created_at,
      updated_at: user.updated_at,
      last_sign_in: user.last_sign_in_at,
      self_categorys: DEFAULT_CATEGORIES,
    });

    if (!error) window.location.href = '/';
  };

  const handleCancel = async () => {
    try {
      // 1. 혹시 모를 자동 저장 로직이 돌지 않도록 상태를 먼저 flag 처리 (필요시)
      // isLoggingOut.current = true;

      // 2. 먼저 페이지 이동을 시도하거나 세션 종료
      const { error } = await supabase.auth.signOut();
      if (error) throw error;

      // 3. 페이지 이동
      window.location.href = '/login'; // router.push보다 더 확실하게 전체 상태를 리셋함
    } catch (error) {
      console.error('로그아웃 중 에러:', error);
    }
  };

  return (
    <div>
      <h1>약관 동의</h1>
      {/* 아까 만든 객체 체크 로직 UI */}
      <button onClick={handleAgree}>동의하고 시작하기</button>
      <button onClick={handleCancel}>가입취소</button>
    </div>
  );
}
