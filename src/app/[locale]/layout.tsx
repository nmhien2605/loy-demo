import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '../globals.css';

import RootProvider from './provider';
import LayoutContainer from '@/components/layout/Container';
import { Locale, i18n } from '@/i18n.config';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

export default function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { locale: Locale };
}>) {
  return (
    <html lang={params.locale}>
      <body className={inter.className}>
        <RootProvider locale={params.locale}>
          <main>
            <LayoutContainer>{children}</LayoutContainer>
          </main>
        </RootProvider>
      </body>
    </html>
  );
}
