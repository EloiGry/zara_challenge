import { useRouter } from 'next/navigation';

import { fireEvent, render, screen } from '@testing-library/react';

import { BackButton } from './back-button';

// Mock useRouter with spyOn
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

describe('BackButton', () => {
  it('should call router.back when clicked', () => {
    const mockBack = jest.fn();

    // Mocking the useRouter return value
    (useRouter as jest.Mock).mockReturnValue({
      back: mockBack,
    });

    render(<BackButton />);

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(mockBack).toHaveBeenCalledTimes(1);
  });
});
