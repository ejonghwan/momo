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

// db에 다크모드 사용자 설정 되어있으면 그거 넣고 아니면 시스템 설정 넣기
const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;

export function Providers({ children }: ProvidersProps) {
  const profile = useUserStore((state) => state.profile);
  // const router = useRouter();

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
      <Theme appearance={(profile?.darkmode ?? isDarkMode) ? 'dark' : 'light'}>{children}</Theme>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
