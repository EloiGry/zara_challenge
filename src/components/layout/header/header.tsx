import Image from 'next/image';
import Link from 'next/link';

import { LogoCart } from '@/components/ui/logo-cart/logo-cart';

import styles from './header.module.css';

import clsx from 'clsx';

export function Header() {
  return (
    <header className={clsx(styles.header)}>
      <div className={clsx('container', styles.container)}>
        <Link href={'/'}>
          <Image src={'/assets/logo.svg'} alt="logo" width={74} height={24} />
        </Link>
        <LogoCart />
      </div>
    </header>
  );
}
