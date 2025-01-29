import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import { Search } from './search';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  useSearchParams: jest.fn(),
  usePathname: jest.fn(),
}));

describe('Search', () => {
  const mockReplace = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      replace: mockReplace,
    });
    (useSearchParams as jest.Mock).mockReturnValue(new URLSearchParams());
    (usePathname as jest.Mock).mockReturnValue('/search');
  });

  it('should render the search input field', () => {
    render(<Search placeholder="Search..." />);
    const input = screen.getByPlaceholderText('Search...');
    expect(input).toBeInTheDocument();
  });

  it('should update search term and call handleSearch when typing', async () => {
    render(<Search placeholder="Search..." />);
    const input = screen.getByPlaceholderText('Search...');
    fireEvent.change(input, { target: { value: 'test' } });
    await waitFor(() => {
      expect(mockReplace).toHaveBeenCalledWith('/search?query=test');
    });
  });

  it('should clear the input when the clear button is clicked', () => {
    render(<Search placeholder="Search..." />);
    const input = screen.getByPlaceholderText('Search...');
    fireEvent.change(input, { target: { value: 'test' } });

    // Ensure the clear button is rendered
    const clearButton = screen.getByAltText('Clear');
    expect(clearButton).toBeInTheDocument();

    fireEvent.click(clearButton);
    expect(input).toHaveValue('');
  });

  it('should call handleSearch with an empty string when cleared', async () => {
    render(<Search placeholder="Search..." />);
    const input = screen.getByPlaceholderText('Search...');
    fireEvent.change(input, { target: { value: 'test' } });
    await waitFor(() => {
      expect(mockReplace).toHaveBeenCalledWith('/search?query=test');
    });

    const clearButton = screen.getByAltText('Clear');
    fireEvent.click(clearButton);

    await waitFor(() => {
      expect(mockReplace).toHaveBeenCalledWith('/search?');
    });
  });
});
