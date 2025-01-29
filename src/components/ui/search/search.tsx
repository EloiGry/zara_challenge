'use client';

import { useState } from 'react';

import Image from 'next/image';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { useDebouncedCallback } from '@/hooks/use-debounce';

import styles from './search.module.css';

import clsx from 'clsx';

interface SearchProps {
  placeholder: string;
  className?: string;
}

export function Search({ placeholder, className }: Readonly<SearchProps>) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams?.toString() || '');
    if (term) {
      params.set('query', term);
    } else {
      params.delete('query');
    }
    router.replace(`${pathname}?${params.toString()}`);
  }, 300);

  const handleClear = () => {
    setSearchTerm('');
    const params = new URLSearchParams(searchParams?.toString() || '');
    params.delete('query');
    router.replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className={clsx(styles.searchContainer, className)}>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          handleSearch(e.target.value);
        }}
        placeholder={placeholder}
        className={clsx(styles.input)}
      />
      {searchTerm && (
        <button onClick={handleClear} className={styles.clearButton}>
          <Image src="/assets/x.svg" alt="Clear" width={16} height={16} />
        </button>
      )}
    </div>
  );
}
