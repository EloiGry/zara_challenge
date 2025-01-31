'use client';

import CartItem from '@/components/ui/cart-item/cart-item';
import { Typography } from '@/components/ui/typography/typography';
import { useCart } from '@/context/cart/cart';

import styles from './cart-list.module.css';

export function CartList() {
  const { cart, removeItem, getItemCount } = useCart();
  const itemCount = getItemCount();
  if (!itemCount || itemCount < 1) {
    return (
      <Typography variant="main-title" uppercase>
        Cart (0)
      </Typography>
    );
  }
  return (
    <section className={styles.container}>
      <Typography variant="main-title" uppercase>
        Cart ({itemCount})
      </Typography>
      <div className={styles.space}>
        {cart.map((item, index) => {
          return (
            <CartItem
              key={index}
              cart={item}
              removeItem={() => removeItem(item.id)}
              index={index}
            />
          );
        })}
      </div>
    </section>
  );
}
