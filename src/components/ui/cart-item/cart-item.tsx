import Image from 'next/image';

import { DEFAULT_CURRENCY } from '@/config/constants';
import { CartItem as CartType } from '@/types/cart';

import { Typography } from '../typography/typography';
import styles from './cart-item.module.css';

interface CartItemProps {
  cart: CartType;
  removeItem: (id: string) => void;
  index?: number;
}
export default function CartItem({
  index,
  cart,
  removeItem,
}: Readonly<CartItemProps>) {
  const currency = DEFAULT_CURRENCY;

  return (
    <div>
      <div className={styles.container}>
        <Image
          src={cart.colorOptions.imageUrl}
          alt={cart.name}
          width={250}
          height={250}
          className={styles.image}
          priority={index === 0}
          style={{objectFit: "contain"}}
        />
        <div className={styles.content}>
          <div className={styles.details}>
            <div>
              <Typography variant="text-md" uppercase>
                {cart.name}
              </Typography>
              <Typography variant="text-md" uppercase>
                {cart.storageOptions.capacity} | {cart.colorOptions.name}
              </Typography>
            </div>
            <Typography variant="text-md" uppercase as="span">
              {cart.storageOptions.price * cart.quantity} {currency}
            </Typography>
            <Typography variant="text-md" uppercase as="span">
              Quantity: {cart.quantity}
            </Typography>
          </div>
          <button className={styles.button} onClick={() => removeItem(cart.id)}>
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
}
