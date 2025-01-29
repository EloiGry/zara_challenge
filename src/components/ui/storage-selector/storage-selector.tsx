'use client';

import { useState } from 'react';

import { StorageOption } from '@/types/product';

import { Typography } from '../typography/typography';
import styles from './storage-selector.module.css';

interface StorageSelectorProps {
  storageOptions: StorageOption[];
  onStorageChange: (storage: StorageOption) => void;
}

export function StorageSelector({
  storageOptions,
  onStorageChange,
}: StorageSelectorProps) {
  const [selectedStorage, setSelectedStorage] = useState<StorageOption | null>(
    null
  );

  const handleStorageChange = (storage: StorageOption) => {
    setSelectedStorage(storage);
    onStorageChange(storage);
  };

  return (
    <div className={styles.space}>
      <Typography variant="text-lg" uppercase>
        Storage ¿How much space do you need?
      </Typography>
      <div className={styles.buttonContainer}>
        {storageOptions.map((storage) => (
          <button
            key={storage.capacity}
            className={`${styles.button} ${
              selectedStorage?.capacity === storage.capacity
                ? styles.selected
                : ''
            }`}
            onClick={() => handleStorageChange(storage)}
          >
            {storage.capacity}
          </button>
        ))}
      </div>
    </div>
  );
}
