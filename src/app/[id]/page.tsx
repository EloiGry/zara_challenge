import { Suspense } from 'react';

import { BackButton } from '@/components/ui/back-button/back-button';
import { Loader } from '@/components/ui/loader/loader';

import styles from './page.module.css';
import { ProductContent } from './product-content';

import clsx from 'clsx';

export default async function ProductPage({params}: Readonly<{params: Promise<{ id: string }>}>) {
  const { id } = await params;

  return (
    <div className={clsx(styles.wrap, 'layoutPage container')}>
      <BackButton className={styles.button} />
      <div className={styles.container}>
        <Suspense fallback={<Loader />}>
          <ProductContent id={id} />
        </Suspense>
      </div>
    </div>
  );
}
