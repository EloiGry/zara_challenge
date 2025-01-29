'use client';

import CartItem from '@/components/ui/cart-item/cart-item';
import { Typography } from '@/components/ui/typography/typography';
import { useCart } from '@/context/cart/cart';

export function CartList() {
  const { cart, removeItem, getItemCount } = useCart();
  console.log(cart);
  const itemCount = getItemCount();
  if (!itemCount || itemCount < 1) {
    return (
      <Typography variant="main-title" uppercase>
        Cart (0)
      </Typography>
    );
  }
  return (
    <section>
      <Typography variant="main-title" uppercase>
        Cart ({itemCount})
      </Typography>
      {cart.map((item, index) => {
        return (
          <CartItem
            key={index}
            cart={item}
            removeItem={() => removeItem(item.id)}
          />
        );
      })}
    </section>
  );
}
