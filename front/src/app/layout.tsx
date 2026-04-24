import type { Metadata } from "next";
import { fontDefault } from "@/lib/ui/fonts";
import { Providers } from "@/app/Provider";
import DeviceTypeLayout from "@/utils/device-type-layout";
import "@/styles/reset.css";
import "@/styles/global.css";
import AuthProvider from "@/components/auth/AuthProvider";
import { CookieOptions, createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export const metadata: Metadata = {
  title: "aatt",
  description: "zzz",
  icons: {
		icon: "@/public/favicon.ico",
	},
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const cookieStore = await cookies()
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
        // 서버 컴포넌트(layout)에서는 보안상 쿠키를 직접 'set' 하거나 'remove' 할 수 없습니다.
        // 하지만 createServerClient의 인터페이스를 맞추기 위해 빈 함수라도 정의해둡니다.
        set(name: string, value: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value, ...options })
          } catch (error) {
            // 서버 컴포넌트에서 호출될 때 발생하는 에러를 무시합니다.
          }
        },
        remove(name: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value: '', ...options })
          } catch (error) {
            // 서버 컴포넌트에서 호출될 때 발생하는 에러를 무시합니다.
          }
        },
      },
    }
  )
  const { data: { user } } = await supabase.auth.getUser()

  return (
    <html lang="ko" className={`${fontDefault.variable}`}>
      <body className="">
        <AuthProvider serverUser={user}>
          <DeviceTypeLayout>
            <Providers>{children}</Providers>
          </DeviceTypeLayout>
        </AuthProvider>
      </body>
    </html>
  );
}

// import { Metadata, Viewport } from "next";
// import { Providers } from "./providers";
// import { fontDefault } from '@/src/lib/ui/fonts'
// import "@/src/styles/globals.css";
// import DeviceTypeLayout from "@/src/components/common/device-type-layout";

// // import clsx from "clsx";

// export const metadata: Metadata = {
// 	title: '',
// 	description: 'b',
// 	icons: {
// 		icon: "/favicon.ico",
// 	},
// };

// export const viewport: Viewport = {
// 	themeColor: [
// 		{ media: "(prefers-color-scheme: light)", color: "white" },
// 		{ media: "(prefers-color-scheme: dark)", color: "black" },
// 	],
// }

// export default function RootLayout({ children, }: { children: React.ReactNode; }) {

// 	return (
// 		<html lang="ko" suppressHydrationWarning className={`${fontDefault.variable}`}>
// 			<head />
// 			{/* min-h-screen bg-background font-sans antialiased */}
// 			<body className={`antialiased`}
// 			>
// 				<DeviceTypeLayout>
// 					<Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
// 						{children}
// 					</Providers>
// 				</DeviceTypeLayout>
// 			</body>
// 		</html>
// 	);
// }
