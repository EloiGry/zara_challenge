import { fireEvent, render, screen } from '@testing-library/react';

import { ColorOption } from '@/types/product';

import { ColorSelector } from './color-selector';

const mockOnColorChange = jest.fn();

const colors: ColorOption[] = [
  { name: 'Red', hexCode: '#ff0000', imageUrl: '/assets/test-image.png' },
  { name: 'Green', hexCode: '#00ff00', imageUrl: '/assets/test-image.png' },
  { name: 'Blue', hexCode: '#0000ff', imageUrl: '/assets/test-image.png' },
];

describe('ColorSelector', () => {
  test('renders all color options', () => {
    render(<ColorSelector colors={colors} onColorChange={mockOnColorChange} />);

    colors.forEach((color) => {
      const colorButton = screen.getByRole('button', {
        name: color.name,
      });
      expect(colorButton).toBeInTheDocument();
    });
  });

  test('calls onColorChange when a color is selected', () => {
    render(<ColorSelector colors={colors} onColorChange={mockOnColorChange} />);

    const redButton = screen.getByRole('button', {
      name: /red/i,
    });
    fireEvent.click(redButton);

    expect(mockOnColorChange).toHaveBeenCalledWith(colors[0]);
  });

  test('updates the selected color', () => {
    render(<ColorSelector colors={colors} onColorChange={mockOnColorChange} />);

    const redButton = screen.getByRole('button', {
      name: /red/i,
    });
    fireEvent.click(redButton);

    expect(screen.getByText(/red/i)).toBeInTheDocument();
  });

  test('renders the correct color name after selection', () => {
    render(<ColorSelector colors={colors} onColorChange={mockOnColorChange} />);

    const redButton = screen.getByRole('button', {
      name: /red/i,
    });
    fireEvent.click(redButton);

    const selectedColorText = screen.getByText('Red');
    expect(selectedColorText).toBeInTheDocument();
  });

  test('applies the selected style to the color button', () => {
    render(<ColorSelector colors={colors} onColorChange={mockOnColorChange} />);

    const redButton = screen.getByRole('button', {
      name: /red/i,
    });
    fireEvent.click(redButton);

    const selectedColorButton = screen.getByRole('button', {
      name: /red/i,
    });
    expect(selectedColorButton).toHaveClass('selected');
  });
});
