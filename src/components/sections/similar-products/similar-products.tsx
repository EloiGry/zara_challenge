import { Card } from '@/components/ui/card/card';
import { Carousel, CarouselSlide } from '@/components/ui/carousel/carousel';
import { Typography } from '@/components/ui/typography/typography';
import { CardsProps } from '@/types/card';

import styles from './similar-products.module.css';

import { EmblaOptionsType } from 'embla-carousel';

type SimilarProductsProps = {
  data: CardsProps[];
};
export function SimilarProducts({ data }: Readonly<SimilarProductsProps>) {
  const OPTIONS: EmblaOptionsType = { dragFree: true };

  if (!data || data.length < 1) {
    return (
      <section className={styles.flexContainer}>
        <Typography variant="text-md">
          No similar products found for this product
        </Typography>
      </section>
    );
  }
  return (
    <section className={styles.flexContainer}>
      <Typography variant="title" uppercase as="h2">
        Similar Products
      </Typography>
      <Carousel options={OPTIONS}>
        {data.map((product: CardsProps, index: number) => (
          <CarouselSlide key={index}>
            <Card
              id={product.id}
              name={product.name}
              brand={product.brand}
              price={product.basePrice}
              image={product.imageUrl}
              className={styles.card}
              index={index}
            />
          </CarouselSlide>
        ))}
      </Carousel>
    </section>
  );
}
