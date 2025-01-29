'use client';

import Image from 'next/image';

import { DEFAULT_CURRENCY } from '@/config/constants';
import { useCart } from '@/context/cart/cart';

import { Typography } from '../typography/typography';
import styles from './cart-item.module.css';

import clsx from 'clsx';

export default function CartItem() {
  const currency = DEFAULT_CURRENCY;
  const { cart, removeItem, updateQuantity, totalPrice } = useCart();
  if (!cart || cart.length < 1) {
    return <p> Nada </p>
  }
  return (
    <div className={clsx(styles.container, 'container')}>
      <Image
        src={cart[0]?.colorOptions.imageUrl}
        alt={cart[0]?.name}
        width={0}
        height={0}
        sizes="100vw"
        style={{ width: 'auto', height: '100%' }}
      />
      <div className={styles.content}>
        <div className={styles.details}>
          <div>
            <Typography variant="text-md" uppercase as="span">
              {cart[0]?.name}{' '}
            </Typography>
            <Typography variant="text-md" uppercase as="span">
              {cart[0]?.storageOptions.capacity} | {cart[0]?.colorOptions.name}
            </Typography>
          </div>
          <Typography variant="text-md" uppercase as="span">
            {cart[0]?.storageOptions.price} {currency}{' '}
          </Typography>
        </div>
        <button className={styles.button}> Eliminar </button>
      </div>
    </div>
  );
}
