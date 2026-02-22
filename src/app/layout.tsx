import type { Metadata } from "next";
import localFont from "next/font/local";
import { JetBrains_Mono } from "next/font/google";
import Providers from "./providers";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CustomCursor from "@/components/layout/CustomCursor";
import "./globals.css";

const pretendard = localFont({
  src: "../fonts/PretendardVariable.woff2",
  variable: "--font-pretendard",
  display: "swap",
  weight: "100 900",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "엄상현 | Terminal Odyssey",
    template: "%s | 엄상현",
  },
  description: "AI Vibe Coder & Web3 Native — 엄상현의 개인 사이트",
  metadataBase: new URL("https://sanghyun.dev"),
  openGraph: {
    title: "엄상현 | Terminal Odyssey",
    description: "AI Vibe Coder & Web3 Native — 엄상현의 개인 사이트",
    type: "website",
    locale: "ko_KR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      className={`${pretendard.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <body className="antialiased min-h-screen">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[10001]
            focus:px-4 focus:py-2 focus:rounded-lg focus:bg-accent-cyan focus:text-bg-primary
            focus:font-mono focus:text-sm focus:outline-none"
        >
          본문으로 건너뛰기
        </a>
        <Providers>
          <CustomCursor />
          <div className="crt-overlay" />
          <Navbar />
          <main id="main-content" className="pt-16">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
