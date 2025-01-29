'use client';

import Image from 'next/image';
import Link from 'next/link';

import { useCart } from '@/context/cart/cart';

import styles from './logo-cart.module.css';

export function LogoCart() {
  const { getItemCount } = useCart();

  const itemCount = getItemCount();
  return (
    <Link href={'/cart'} className={styles.cart}>
      <Image
        src={
          itemCount > 0 ? '/assets/cart_solid.svg' : '/assets/cart_outline.svg'
        }
        alt={'logo_cart'}
        width={18}
        height={18}
      />
      <span>{itemCount}</span>
    </Link>
  );
}
