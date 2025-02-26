import { Suspense } from 'react';

import { getProductById } from '@/api/products';
import { ProductSection } from '@/components/sections/product/product';
import { SimilarProducts } from '@/components/sections/similar-products/similar-products';
import { Specs } from '@/components/sections/specs/specs';
import { BackButton } from '@/components/ui/back-button/back-button';
import { Loader } from '@/components/ui/loader/loader';

import styles from './page.module.css';

import clsx from 'clsx';

type Params = { id: string };


export default async function ProductPage(props: Readonly<{ params: Params }>) {
  const params = await props.params;
  return (
    <div className={clsx(styles.wrap, 'layoutPage container')}>
      <BackButton className={styles.button} />
      <div className={styles.container}>
        <Suspense fallback={<Loader />}>
          <ProductContent id={params.id} />
        </Suspense>
      </div>
    </div>
  );
}

export async function ProductContent({ id }: Readonly<{ id: string }>) {
  const data = await getProductById(id);

  return (
    <>
      <ProductSection product={data} />
      <Specs specs={data.specs} />
      <SimilarProducts data={data.similarProducts} />
    </>
  );
}