import type { Metadata } from 'next';
import { Raleway } from 'next/font/google';
import './globals.css';
import { SessionProvider } from 'next-auth/react';

const raleway = Raleway({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Store',
  description: 'Simple store by yasser farhadi',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={raleway.className}>
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  );
}
