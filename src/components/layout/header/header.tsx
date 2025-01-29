'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { LogoCart } from '@/components/ui/logo-cart/logo-cart';
import { useCart } from '@/context/cart/cart';

import styles from './header.module.css';

import clsx from 'clsx';

export function Header() {
  const { getItemCount } = useCart();
  const pathname = usePathname();
  const itemCount = getItemCount();

  const border = pathname === '/cart' && itemCount > 0;
  return (
    <header
      className={styles.header}
      style={border ? { borderBottom: '1px solid black' } : undefined}
    >
      <div className={clsx('container', styles.container)}>
        <Link href={'/'}>
          <Image src={'/assets/logo.svg'} alt="logo" width={74} height={24} />
        </Link>
        <LogoCart />
      </div>
    </header>
  );
}
