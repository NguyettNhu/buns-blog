import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Bun's Blog - Chia sẻ kiến thức lập trình",
  description:
    "Blog chia sẻ kiến thức, kinh nghiệm và những điều thú vị trong thế giới lập trình",
  keywords: ["blog", "lập trình", "javascript", "react", "nextjs", "tailwind"],
  authors: [{ name: "Bun's Blog Team" }],
  creator: "Bun's Blog Team",
  openGraph: {
    type: "website",
    locale: "vi_VN",
    url: "https://bunsblog.vercel.app",
    siteName: "Bun's Blog",
    title: "Bun's Blog - Chia sẻ kiến thức lập trình",
    description:
      "Blog chia sẻ kiến thức, kinh nghiệm và những điều thú vị trong thế giới lập trình",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bun's Blog - Chia sẻ kiến thức lập trình",
    description:
      "Blog chia sẻ kiến thức, kinh nghiệm và những điều thú vị trong thế giới lập trình",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <body
        className={`
          ${geistSans.variable} 
          ${geistMono.variable} 
          antialiased 
          min-h-screen 
          flex flex-col 
          bg-galaxy
        `}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          <main className="flex-1 z-10 relative">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
