import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const next = searchParams.get('next') ?? '/' // 로그인 후 이동할 기본 경로

  if (code) {
    const cookieStore = await cookies() 
    
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            return cookieStore.get(name)?.value
          },
          set(name: string, value: string, options: CookieOptions) {
            cookieStore.set({ name, value, ...options })
          },
          remove(name: string, options: CookieOptions) {
            cookieStore.set({ name, value: '', ...options })
          },
        },
      }
    )

    // 1. 코드를 세션으로 교환 (이제 브라우저 쿠키에 세션이 생성됨)
    const { data: { user }, error } = await supabase.auth.exchangeCodeForSession(code)

    if (!error && user) {
      // 2. 내 DB(public.users)에 유저 정보가 이미 있는지 확인
      const { data: dbUser, error: dbError } = await supabase
        .from('users')
        .select('id')
        .eq('id', user.id)
        .maybeSingle() // 한 명만 있거나 없거나 (single() 보다 에러에 안전함)

      // 3. DB에 유저가 없다면(신규 가입자) 약관 동의 페이지로 리다이렉트
      if (!dbUser) {
        return NextResponse.redirect(`${origin}/terms`)
      }

      // 4. 이미 가입된 유저라면 원래 가려던 곳(next)이나 메인으로 이동
      return NextResponse.redirect(`${origin}${next}`)
    }
  }

  // 실패 시 로그인 페이지로 에러와 함께 이동
  return NextResponse.redirect(`${origin}/login?error=auth`)
}