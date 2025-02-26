import styles from './loader.module.css';

import clsx from 'clsx';

type LoaderProps = {
  className?: string;
};

export function Loader({ className }: Readonly<LoaderProps>) {
  return (
    <div className={clsx(styles.loaderContainer, className)}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="48"
        height="48"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        data-testid="loading-spinner"
        className={styles.loadingSpinner}
      >
        <path d="M21 12a9 9 0 1 1-6.219-8.56" />
      </svg>
    </div>
  );
}
