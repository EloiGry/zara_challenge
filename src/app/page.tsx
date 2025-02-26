import { Suspense } from 'react';

import { Loader } from '@/components/ui/loader/loader';

import styles from './page.module.css';
import { ProductsList } from './products-list';

import clsx from 'clsx';

type SearchParams = Promise<{ [key: string]: string }>;

export default function Home(props: Readonly<{ searchParams: SearchParams }>) {
  return (
    <div className={clsx(styles.space, 'container layoutPage')}>
      <Suspense fallback={<Loader />}>
        <ProductsList searchParams={props.searchParams} />
      </Suspense>
    </div>
  );
}
