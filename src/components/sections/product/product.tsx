'use client';

import { useState } from 'react';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button/button';
import { ColorSelector } from '@/components/ui/color-selector/color-selector';
import { StorageSelector } from '@/components/ui/storage-selector/storage-selector';
import { Typography } from '@/components/ui/typography/typography';
import { DEFAULT_CURRENCY } from '@/config/constants';
import { useCartActions } from '@/hooks/use-cart-actions/use-cart-actions';
import { ColorOption, Product, StorageOption } from '@/types/product';

import styles from './product.module.css';

export function ProductSection({ product }: Readonly<{ product: Product }>) {
  const { handleAddToCart } = useCartActions();
  const [selectedColor, setSelectedColor] = useState<ColorOption | null>(null);
  const [selectedStorage, setSelectedStorage] = useState<StorageOption | null>(
    null
  );
  const router = useRouter();
  const currency = DEFAULT_CURRENCY;

  const handleColorChange = (color: ColorOption) => {
    setSelectedColor(color);
  };

  const handleStorageChange = (storage: StorageOption) => {
    setSelectedStorage(storage);
  };

  return (
    <section>
      <div className={styles.container}>
        <Image
          src={selectedColor?.imageUrl ?? product.colorOptions[0].imageUrl}
          alt={product.name}
          width={300}
          height={300}
          className={styles.image}
        />
        <div className={styles.details}>
          <div className={styles.title}>
            <Typography variant="main-title" as="h1" uppercase>
              {product.name}
            </Typography>
            <Typography variant="text-xl" uppercase>
              {selectedStorage?.price ?? product.basePrice} {currency}
            </Typography>
          </div>
          <div className={styles.selectors}>
            <StorageSelector
              storageOptions={product.storageOptions}
              onStorageChange={handleStorageChange}
            />
            <ColorSelector
              colors={product.colorOptions}
              onColorChange={handleColorChange}
            />
          </div>
          <Button
            variant="secondary"
            extraHeight
            disabled={!selectedColor || !selectedStorage}
            onClick={() => {
              handleAddToCart(product, selectedColor, selectedStorage);
              router.push('/cart');
            }}
            className={styles.button}
          >
            Añadir
          </Button>
        </div>
      </div>
    </section>
  );
}
