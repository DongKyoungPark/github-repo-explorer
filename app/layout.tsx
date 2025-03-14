import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { cookies } from 'next/headers';
import { Header } from '@/app/components/Header';
import { defaultLocale } from '@/translate/i18n-config';
import TranslationsProvider from '@/translate/TranslationsProvider';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'GitHub Repository Explorer',
  description: 'Search and explore GitHub repositories',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const localeCookie = cookieStore.get('NEXT_LOCALE');
  const locale = localeCookie?.value || defaultLocale;

  const themeCookie = cookieStore.get('theme');
  const theme = themeCookie?.value;

  return (
    <html lang={locale} className={theme === 'dark' ? 'dark' : 'light'}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-background text-foreground`}
      >
        <TranslationsProvider locale={locale} namespaces={['common']}>
          <Header />
          <main className="container mx-auto px-4 py-8">{children}</main>
        </TranslationsProvider>
      </body>
    </html>
  );
}
