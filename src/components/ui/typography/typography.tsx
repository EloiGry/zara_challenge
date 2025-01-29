import styles from './typography.module.css';

import clsx from 'clsx';

interface TypographyProps {
  variant:
    | 'main-title'
    | 'title'
    | 'text-xl'
    | 'text-lg'
    | 'text-md'
    | 'text-sm';
  uppercase?: boolean;
  className?: string;
  as?: React.ElementType;
  children: React.ReactNode;
}

export function Typography({
  variant,
  uppercase = false,
  className,
  as: ElementType = 'p',
  children,
}: Readonly<TypographyProps>) {
  return (
    <ElementType
      className={clsx(
        styles[variant],
        uppercase && styles.uppercase,
        className
      )}
    >
      {children}
    </ElementType>
  );
}
