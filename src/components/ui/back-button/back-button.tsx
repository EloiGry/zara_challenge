'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { Typography } from '../typography/typography';
import styles from './back-button.module.css';

import clsx from 'clsx';

type BackButtonProps = {
  className?: string;
};

export function BackButton({ className }: Readonly<BackButtonProps>) {
  const router = useRouter();

  const handleBackClick = () => {
    router.back();
  };

  return (
    <button
      onClick={handleBackClick}
      className={clsx(styles.button, className)}
    >
      <Image src="/assets/chevron_left.svg" width={20} height={20} alt="Back" />
      <Typography variant="text-md" uppercase as="span">
        Back
      </Typography>
    </button>
  );
}
