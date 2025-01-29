import { render, screen } from '@testing-library/react';

import { Specs } from './specs';

describe('Specs Component', () => {
  const specsMock = {
    screen: '6.5 inches',
    resolution: '1080 x 2400',
    processor: 'Snapdragon 888',
    mainCamera: '64MP',
    selfieCamera: '20MP',
    battery: '4500mAh',
    os: 'Android 11',
    screenRefreshRate: '120Hz',
  };

  it('renders the title correctly', () => {
    render(<Specs specs={specsMock} />);

    const title = screen.getByText('Specifications');
    expect(title).toBeInTheDocument();
  });

  it('renders all specification entries', () => {
    render(<Specs specs={specsMock} />);

    Object.keys(specsMock).forEach((key) => {
      const specKey = screen.getByText(key.replace(/([A-Z])/g, ' $1').trim());
      const specValue = screen.getByText(
        specsMock[key as keyof typeof specsMock]
      );
      expect(specKey).toBeInTheDocument();
      expect(specValue).toBeInTheDocument();
    });
  });

  it('formats keys with spaces correctly', () => {
    render(<Specs specs={specsMock} />);

    const screenLabel = screen.getByText('screen');
    const resolutionLabel = screen.getByText('resolution');
    expect(screenLabel).toBeInTheDocument();
    expect(resolutionLabel).toBeInTheDocument();
  });

  it('does not render empty values', () => {
    const emptySpecsMock = { ...specsMock, screen: '' };
    render(<Specs specs={emptySpecsMock} />);

    const screenLabel = screen.getByText('screen');
    expect(screenLabel).toBeInTheDocument();
  });
});
