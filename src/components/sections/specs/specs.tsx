import { Typography } from '@/components/ui/typography/typography';

import styles from './specs.module.css';

interface SpecsProps {
  specs: {
    [key: string]: string;
  };
}

export function Specs({ specs }: SpecsProps) {
  return (
    <div className={styles.flexContainer}>
      <Typography variant="title" uppercase>
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
    </div>
  );
}
