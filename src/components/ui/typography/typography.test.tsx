import { render, screen } from '@testing-library/react';

import { Typography } from './typography';

describe('Typography', () => {
  it('renders correct text with variant', () => {
    render(<Typography variant="main-title">Main Title</Typography>);
    expect(screen.getByText('Main Title')).toBeInTheDocument();
  });

  it('renders uppercase text when uppercase is true', () => {
    render(
      <Typography variant="text-lg" uppercase>
        Uppercase Text
      </Typography>
    );
    expect(screen.getByText('Uppercase Text')).toHaveClass('uppercase');
  });

  it('applies custom className', () => {
    render(
      <Typography variant="text-sm" className="custom-class">
        Custom Class
      </Typography>
    );
    expect(screen.getByText('Custom Class')).toHaveClass('custom-class');
  });

  it('renders as custom element (h1)', () => {
    render(
      <Typography variant="title" as="h1">
        Title as h1
      </Typography>
    );
    const element = screen.getByText('Title as h1');
    expect(element.tagName).toBe('H1');
  });
});
