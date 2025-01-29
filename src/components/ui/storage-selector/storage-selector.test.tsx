import { fireEvent, render, screen } from '@testing-library/react';

import { StorageOption } from '@/types/product';

import { StorageSelector } from './storage-selector';

describe('StorageSelector', () => {
  const mockOnStorageChange = jest.fn();
  const storageOptions: StorageOption[] = [
    { capacity: '128GB', price: 200 },
    { capacity: '256GB', price: 300 },
    { capacity: '512GB', price: 400 },
  ];

  beforeEach(() => {
    render(
      <StorageSelector
        storageOptions={storageOptions}
        onStorageChange={mockOnStorageChange}
      />
    );
  });

  test('renders all storage options', () => {
    storageOptions.forEach((storage) => {
      expect(
        screen.getByRole('button', { name: storage.capacity })
      ).toBeInTheDocument();
    });
  });

  test('calls onStorageChange when a storage option is selected', () => {
    const storageButton = screen.getByRole('button', { name: '256GB' });
    fireEvent.click(storageButton);

    expect(mockOnStorageChange).toHaveBeenCalledWith(storageOptions[1]);
  });

  test('updates the selected storage option', () => {
    const storageButton = screen.getByRole('button', { name: '128GB' });
    fireEvent.click(storageButton);

    expect(screen.getByText('128GB')).toBeInTheDocument();
    expect(storageButton).toHaveClass('selected');
  });

  test('applies the selected style to the storage button', () => {
    const storageButton = screen.getByRole('button', { name: '512GB' });
    fireEvent.click(storageButton);

    expect(storageButton).toHaveClass('selected');
  });
});
