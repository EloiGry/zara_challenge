import { Typography } from '@/components/ui/typography/typography';

import styles from './specs.module.css';

interface SpecsProps {
  specs: {
    [key: string]: string;
  };
}

export function Specs({ specs }: Readonly<SpecsProps>) {
  if (!specs || Object.keys(specs).length < 1) {
    return (
      <section className={styles.flexContainer}>
        <Typography variant="text-md">
          No specifications available for this product
        </Typography>
      </section>
    );
  }
  return (
    <section className={styles.flexContainer}>
      <Typography variant="title" uppercase as="h2">
        Specifications
      </Typography>
      <div>
        {Object.entries(specs).map(([key, value]) => (
          <div key={key} className={styles.gridContainer}>
            <Typography variant="text-md" uppercase>
              {key.replace(/([A-Z])/g, ' $1').trim()}
            </Typography>
            <Typography variant="text-md">{value}</Typography>
          </div>
        ))}
      </div>
    </section>
  );
}
