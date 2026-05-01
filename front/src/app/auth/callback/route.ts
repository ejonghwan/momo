import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

import { type CookieOptions, createServerClient } from '@supabase/ssr';

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  const next = searchParams.get('next') ?? '/'; // 로그인 후 이동할 기본 경로

  if (code) {
    const cookieStore = await cookies();

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            return cookieStore.get(name)?.value;
          },
          set(name: string, value: string, options: CookieOptions) {
            cookieStore.set({ name, value, ...options });
          },
          remove(name: string, options: CookieOptions) {
            cookieStore.set({ name, value: '', ...options });
          },
        },
      },
    );

    // 1. 코드를 세션으로 교환 (인증 완료 및 쿠키 생성)
    const {
      data: { user, session },
      error: authError,
    } = await supabase.auth.exchangeCodeForSession(code);

    if (authError) {
      console.error('인증 에러 (exchangeCodeForSession):', authError.message);
      return NextResponse.redirect(`${origin}/login?error=auth_exchange_failed`);
    }

    if (user) {
      // 2. 내 DB(public.users)에 유저 정보가 있는지 확인
      // [중요] RLS 정책이 SELECT: true 또는 auth.uid() = id 여야 합니다.
      const { data: dbUser, error: dbError } = await supabase
        .from('users')
        .select('id')
        .eq('id', user.id)
        .maybeSingle();

      // 만약 DB 조회 에러가 난다면 (정책 문제 등)
      if (dbError) {
        console.warn('DB 유저 확인 실패 (정책 또는 테이블 문제):', dbError.message);
        // DB 확인에 실패했어도 세션은 생성되었으므로 일단 메인으로 보냅니다.
        // 여기서 로그인을 막아버리면 유저는 무한 루프에 빠집니다.
        return NextResponse.redirect(`${origin}${next}`);
      }

      // 3. 신규 가입자라면 약관 동의 페이지로 리다이렉트
      if (!dbUser) {
        return NextResponse.redirect(`${origin}/terms`);
      }

      // 4. 이미 가입된 유저라면 원래 목적지로 이동
      return NextResponse.redirect(`${origin}${next}`);
    }
  }

  // 5. code가 없거나 알 수 없는 에러 시
  console.error('로그인 실패: 유효한 code가 없거나 유저 정보를 가져올 수 없음');
  return NextResponse.redirect(`${origin}/login?error=invalid_request`);
}
