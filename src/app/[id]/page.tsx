import { getProductById } from '@/api/products';
import { ProductSection } from '@/components/sections/product/product';
import { SimilarProducts } from '@/components/sections/similar-products/similar-products';
import { Specs } from '@/components/sections/specs/specs';
import { BackButton } from '@/components/ui/back-button/back-button';

import styles from './page.module.css';

import clsx from 'clsx';

type Params = Promise<{ id: string }>;

export default async function ProductPage(props: Readonly<{ params: Params }>) {
  const params = await props.params;
  const data = await getProductById(params.id);

  return (
    <div className={clsx(styles.wrap, 'layoutPage container')}>
      <BackButton className={styles.button} />
      <div className={styles.container}>
        <ProductSection product={data} />
        <Specs specs={data.specs} />
        <SimilarProducts data={data.similarProducts} />
      </div>
    </div>
  );
}
