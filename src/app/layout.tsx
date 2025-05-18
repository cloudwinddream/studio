import type { Metadata } from 'next';
import { Inter } from 'next/font/google'; // Using Inter as a standard Google Font
import './globals.css';
import { AppProviders } from '@/components/providers';
import { APP_NAME } from '@/lib/constants';
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: APP_NAME,
  description: '您的个人八字、每日运势及古老智慧指南。',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body className={`${inter.variable} antialiased`}>
        <AppProviders>
          {children}
          <Toaster />
        </AppProviders>
      </body>
    </html>
  );
}
