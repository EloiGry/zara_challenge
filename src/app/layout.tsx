import type { Metadata } from 'next';

import { Header } from '@/components/layout/header/header';
import { CartProvider } from '@/context/cart/cart';

import './globals.css';

export const metadata: Metadata = {
  title: 'Zara Challenge',
  description: 'Technical test for Napptilus',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <Header />
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
