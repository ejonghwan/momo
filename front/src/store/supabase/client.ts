import { createBrowserClient } from '@supabase/ssr';
// import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// 클라이언트 컴포넌트에서 어디서든 import { supabase } 로 쓸 수 있게 변수로 내보냅니다.
// 내부적으로 @supabase/ssr을 사용하므로 쿠키 세션을 완벽하게 읽어옵니다.
export const supabase = createBrowserClient(supabaseUrl, supabaseAnonKey);

// const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
// const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
//   auth: {
//     persistSession: true, // 세션을 로컬 스토리지에 저장!
//     autoRefreshToken: true, // 토큰 만료 시 자동 갱신!
//   },
// });

// export const createBrowserClientFn = () =>
//   createBrowserClient(
//     process.env.NEXT_PUBLIC_SUPABASE_URL!,
//     process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
//   );
