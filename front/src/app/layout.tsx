import type { Metadata } from 'next';

import { Providers } from '@/app/Provider';
import AuthProvider from '@/components/auth/AuthProvider';
import { fontDefault } from '@/lib/ui/fonts';
import { getCookieStore } from '@/store/supabase/supabase';
import DeviceTypeLayout from '@/utils/device-type-layout';

// import "@/styles/base/reset.scss";
import '@/styles/base/global.scss';

export const metadata: Metadata = {
  title: 'aatt',
  description: 'zzz',
  icons: {
    icon: '@/public/favicon.ico',
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // 인증된 user 기본 데이터
  const supabase = await getCookieStore();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // db에 저장된 user data
  let userProfile = null;
  if (user) {
    const { data, error } = await supabase
      .from('users') // 'users' 테이블 혹은 'profiles' 테이블
      .select('*')
      .eq('id', user.id)
      .single();

    if (!error && data) {
      userProfile = data;
    }
  }

  return (
    <html lang="ko" className={`${fontDefault.variable}`}>
      <body className="">
        <AuthProvider serverUser={user} userProfile={userProfile}>
          <DeviceTypeLayout>
            <Providers>{children}</Providers>
          </DeviceTypeLayout>
        </AuthProvider>
      </body>
    </html>
  );
}
