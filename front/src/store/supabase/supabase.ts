import { createClient } from '@supabase/supabase-js'
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// 브라우저에서 사용할 클라이언트
export const supabase = createClient(supabaseUrl, supabaseAnonKey)


// 겟 쿠키
export const getCookieStore = async () => {
   const cookieStore = await cookies();
   const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
         cookies: {
            // 이제 수동으로 get/set/remove를 다 짤 필요 없이 
            // getAll()과 setAll()을 사용하는 것이 최신 표준입니다.
            getAll() {
               return cookieStore.getAll();
            },
            setAll(cookiesToSet) {
               try {
                  cookiesToSet.forEach(({ name, value, options }) =>
                     cookieStore.set(name, value, options)
                  );
               } catch {
                  // 서버 컴포넌트(Layout 등)에서 호출될 때의 에러를 무시합니다.
                  // 실제 쿠키 수정은 Middleware나 Server Action에서 담당하게 됩니다.
               }
            },
         },
      }
   );

   return supabase;
}