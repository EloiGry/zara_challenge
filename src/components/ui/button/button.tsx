'use client';

import styles from './button.module.css';

import clsx from 'clsx';

interface ButtonProps {
  variant: 'primary' | 'secondary';
  size?: 'xs' | 'l';
  extraHeight?: boolean;
  disabled?: boolean;
  active?: boolean;
  onClick?: () => void;
  className?: string;
  children: React.ReactNode;
}

export function Button({
  variant,
  size = 'xs',
  extraHeight = false,
  disabled = false,
  active = false,
  onClick,
  className,
  children,
}: Readonly<ButtonProps>) {
  return (
    <button
      onClick={onClick}
      className={clsx(
        styles.button,
        styles[variant],
        styles[size],
        {
          [styles.extraHeight]: extraHeight,
          [styles.disabled]: disabled,
          [styles.active]: active,
        },
        className
      )}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
