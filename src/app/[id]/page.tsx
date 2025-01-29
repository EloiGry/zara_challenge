import { getProductById } from '@/api/products';
import { ProductSection } from '@/components/sections/product/product';
import { Specs } from '@/components/sections/specs/specs';
import { Card } from '@/components/ui/card/card';
import { Carousel, CarouselSlide } from '@/components/ui/carousel/carousel';

import styles from './page.module.css';

import clsx from 'clsx';
import { EmblaOptionsType } from 'embla-carousel';

export default async function ProductPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  const data = await getProductById(id);
  const OPTIONS: EmblaOptionsType = { dragFree: true };
  console.log(data);

  return (
    <>
      <div className="container layoutPage">
        <div className={styles.container}>
          <ProductSection product={data} />
          <Specs specs={data.specs} />
        </div>
      </div>
      <div>
      <Carousel
        options={OPTIONS}
        className={clsx(styles.container_slider)}
      >
        {data.similarProducts.map((product: any, index: number) => (
          <CarouselSlide key={index}>
            <Card
              id={product.id}
              name={product.name}
              brand={product.brand}
              price={product.basePrice}
              image={product.imageUrl}
              className={styles.card}
            />
          </CarouselSlide>
        ))}
      </Carousel>
      </div>
    </>
  );
}
