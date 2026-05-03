'use client';

import { useEffect } from 'react';

import { createBrowserClient } from '@supabase/ssr';
import { User } from '@supabase/supabase-js';

import { useUserStore } from '@/store/front/useUserStore';
import { UserType } from '@/types/user/UserType';

const AuthProvider = ({
  serverUser,
  children,
  userProfile,
}: {
  serverUser: User | null;
  userProfile: UserType;
  children: React.ReactNode;
}) => {
  const setUser = useUserStore((state) => state.setUser);
  const setUserProfile = useUserStore((state) => state.setUserProfile);

  useEffect(() => {
    console.log('::::::::::::::::: serverUser : ', serverUser);
    console.log('::::::::::::::::: UserProfile : ', userProfile);

    // 서버에서 넘겨준 초기 유저 정보 저장
    setUser(serverUser);
    setUserProfile(userProfile);

    // 클라이언트에서 세션 변화 감지 (로그아웃 등)
    const supabase = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    );

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN') setUser(session?.user ?? null);
      if (event === 'SIGNED_OUT') setUser(null);
    });

    return () => subscription.unsubscribe();
  }, [serverUser, setUser]);

  return <>{children}</>;
};

export default AuthProvider;
