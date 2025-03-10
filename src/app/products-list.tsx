import { getProducts } from '@/api/products';
import CardsList from '@/components/sections/cards-list/cards-list';
import { Search } from '@/components/ui/search/search';
import { Typography } from '@/components/ui/typography/typography';

import styles from './page.module.css';

type SearchParams = Promise<{ [key: string]: string }>;

export async function ProductsList({
  searchParams,
}: Readonly<{ searchParams: SearchParams }>) {
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
