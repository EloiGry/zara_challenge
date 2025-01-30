import Image from 'next/image';
import Link from 'next/link';

import { Typography } from '@/components/ui/typography/typography';
import { DEFAULT_CURRENCY } from '@/config/constants';
import { CardProps as CardType } from '@/types/card';

import styles from './card.module.css';

import clsx from 'clsx';

interface CardProps extends CardType {
  className?: string;
  index?: number;
}

export function Card({
  id,
  name,
  brand,
  price,
  image,
  className,
  index,
}: Readonly<CardProps>) {
  const currency = DEFAULT_CURRENCY;
  return (
    <Link href={`/${id}`} className={clsx(styles.link)}>
      <div className={clsx(styles.card, styles.flexColumn, className)}>
        <Image
          src={image}
          alt={name}
          className={styles.image}
          width={200}
          height={200}
          priority={index === 0}
        />
        <div
          className={clsx(styles.flex, styles.spaceBetween, styles.alignBottom)}
        >
          <div className={clsx(styles.flexColumn)}>
            <Typography
              variant="text-sm"
              uppercase
              as="span"
              className={styles.brand}
            >
              {brand}
            </Typography>
            <Typography variant="text-md" uppercase>
              {name}
            </Typography>
          </div>
          <Typography variant="text-md" uppercase as="span">
            {String(price)} {currency}
          </Typography>
        </div>
      </div>
    </Link>
  );
}
