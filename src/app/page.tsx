import { Suspense } from 'react';

import { getProducts } from '@/api/products';
import CardsList from '@/components/sections/cards-list/cards-list';
import { Loader } from '@/components/ui/loader/loader';
import { Search } from '@/components/ui/search/search';
import { Typography } from '@/components/ui/typography/typography';

import styles from './page.module.css';

import clsx from 'clsx';

type SearchParams = Promise<{ [key: string]: string }>;

export async function ProductsList({ searchParams }: { searchParams: SearchParams }) {
  const query = (await searchParams).query;
  const products = await getProducts(query, 20);
  const totalResults = products.length;

  return (
    <>
      <div className={styles.search}>
        <Search placeholder="Search products..." />
        <Typography variant="text-md" as="p" uppercase>
          {totalResults} result{totalResults !== 1 ? 's' : ''}
        </Typography>
      </div>
      <CardsList cards={products} />
    </>
  );
}

export default function Home(props: Readonly<{ searchParams: SearchParams }>) {
  return (
    <div className={clsx(styles.space, 'container layoutPage')}>
      <Suspense fallback={<Loader />}>
        <ProductsList searchParams={props.searchParams} />
      </Suspense>
    </div>
  );
}
