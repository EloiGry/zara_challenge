import { CartFooter } from '@/components/layout/cart-footer/cart-footer';
import { CartList } from '@/components/sections/cart-list/cart-list';

import styles from './page.module.css';

import clsx from 'clsx';

export default function Cart() {
  return (
    <div className={clsx('layoutPage container', styles.container)}>
      <CartList />
      <CartFooter />
    </div>
  );
}
