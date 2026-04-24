import type { Metadata } from "next";
import { fontDefault } from "@/lib/ui/fonts";
import { Providers } from "@/app/Provider";
import DeviceTypeLayout from "@/utils/device-type-layout";
import "@/styles/reset.css";
import "@/styles/global.css";
import AuthProvider from "@/components/auth/AuthProvider";
import { getCookieStore } from '@/store/supabase/supabase'

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


  const supabase = await getCookieStore();
  const { data: { user } } = await supabase.auth.getUser();

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
