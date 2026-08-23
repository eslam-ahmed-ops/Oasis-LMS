import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import ChatBotWidget from "@/components/chat/ChatBotWidget";

export const metadata: Metadata = {
  title: "الواحة التعليمية",
  description: "منصة تعليمية عربية متكاملة",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <body className="min-h-screen font-tajawal antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange={false}
        >
          {children}
          <ChatBotWidget />
        </ThemeProvider>
      </body>
    </html>
  );
}
