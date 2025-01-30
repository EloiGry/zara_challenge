'use client';

import { useState } from 'react';

import { ColorOption } from '@/types/product';

import { Typography } from '../typography/typography';
import styles from './color-selector.module.css';

interface ColorSelectorProps {
  colors: ColorOption[];
  onColorChange: (color: ColorOption) => void;
}

export function ColorSelector({
  colors,
  onColorChange,
}: Readonly<ColorSelectorProps>) {
  const [selectedColor, setSelectedColor] = useState<ColorOption | null>(null);

  const handleColorChange = (color: ColorOption) => {
    setSelectedColor(color);
    onColorChange(color);
  };

  return (
    <div>
      <div className={styles.space}>
        <Typography variant="text-lg" uppercase>
          color. pick your favourite
        </Typography>
        <div className={styles.colors}>
          {colors.map((color) => (
            <button
              key={color.name}
              aria-label={color.name}
              className={`${styles.button} ${
                selectedColor?.name === color.name ? styles.selected : ''
              }`}
              onClick={() => handleColorChange(color)}
            >
              <div
                className={styles.colorBox}
                style={{ backgroundColor: color.hexCode }}
              />
            </button>
          ))}
        </div>
      </div>
      {selectedColor && (
        <Typography variant="text-md" uppercase as="span">
          {selectedColor.name}
        </Typography>
      )}
    </div>
  );
}
