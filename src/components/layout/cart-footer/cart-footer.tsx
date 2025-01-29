'use client';

import Link from 'next/link';

import { Button } from '@/components/ui/button/button';
import { useCart } from '@/context/cart/cart';

import styles from './cart.module.css';

import clsx from 'clsx';

export function CartFooter() {
  const { totalPrice, getItemCount } = useCart();
  const itemCount = getItemCount();
  if (!itemCount || itemCount < 1) {
    return <EmptyCartFooter />;
  }
  return (
    <footer className={styles.footer}>
      <div className={clsx('container', styles.container)}>
        <div className={clsx(styles.text, styles.spaceBetween)}>
          <span> Total </span>
          <span className={styles.nowrap}> {totalPrice} EUR</span>
        </div>

        <Link href="/">
          <Button
            variant="primary"
            extraHeight
            className={clsx(styles.button, styles.shopButton)}
          >
            Continue Shopping{' '}
          </Button>
        </Link>

        <Button
          variant="secondary"
          extraHeight
          className={clsx(styles.button, styles.payButton)}
        >
          Pay
        </Button>
      </div>
    </footer>
  );
}

export function EmptyCartFooter() {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <Button
          variant="primary"
          extraHeight
          className={clsx(styles.button, styles.shopButton)}
        >
          <Link href="/">Continue Shopping</Link>
        </Button>
      </div>
    </footer>
  );
}
