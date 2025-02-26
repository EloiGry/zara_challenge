import { Suspense } from 'react';

import { BackButton } from '@/components/ui/back-button/back-button';
import { Loader } from '@/components/ui/loader/loader';

import styles from './page.module.css';
import { ProductContent } from './product-content';

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
