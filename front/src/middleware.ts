import { type NextRequest, NextResponse } from 'next/server';

import { createServerClient } from '@supabase/ssr';

export async function middleware(request: NextRequest) {
  // 1. 초기 응답 객체 생성
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  // 2. supabase 클라이언트 생성
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value));
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options),
          );
        },
      },
    },
  );

  // 3. 세션 갱신 (리프레시 토큰 처리)
  // 중요: 여기서 정보를 읽어와야 쿠키가 최신화됩니다.
  await supabase.auth.getUser();

  return response;
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'],
};
