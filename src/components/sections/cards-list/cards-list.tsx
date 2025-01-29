import { Card } from '@/components/ui/card/card';
import { CardsProps } from '@/types/card';

import styles from './cards-list.module.css';

type CardsListProps = {
  cards: CardsProps[];
};
export default function CardsList({ cards }: Readonly<CardsListProps>) {
  return (
    <section className={styles.gridContainer}>
      {cards.map((product: any, index: number) => (
        <Card
          key={index}
          id={product.id}
          name={product.name}
          brand={product.brand}
          price={product.basePrice}
          image={product.imageUrl}
        />
      ))}
    </section>
  );
}
