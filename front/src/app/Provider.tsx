'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';

import { Theme } from '@radix-ui/themes';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { useUserStore } from '@/store/front/useUserStore';

export interface ProvidersProps {
  children: React.ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  const profile = useUserStore((state) => state.profile);
  // const router = useRouter();

  // db에 다크모드 사용자 설정 되어있으면 그거 넣고 아니면 시스템 설정 넣기
  // const isSystemDarkMode = window?.matchMedia('(prefers-color-scheme: dark)').matches;
  const [isSystemDarkMode, setIsSystemDarkMode] = React.useState(false);

  React.useEffect(() => {
    if (typeof window === 'undefined') return;
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setIsSystemDarkMode(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setIsSystemDarkMode(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);

    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // 크롬 테마 별로 html에 클래스 붙임
  React.useEffect(() => {
    console.log('???? isSystemDarkMode', isSystemDarkMode);

    if (isSystemDarkMode) {
      document.querySelector('html')?.classList.add('darkmode');
    } else {
      document.querySelector('html')?.classList.remove('darkmode');
    }
  }, [isSystemDarkMode]);

  const [queryClient] = React.useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000,
          },
        },
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>
      <Theme appearance={(profile?.darkmode ?? isSystemDarkMode) ? 'dark' : 'light'}>
        {children}
      </Theme>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
