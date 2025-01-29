import { render, screen } from '@testing-library/react';
import { SimilarProducts } from './similar-products'; 

describe('SimilarProducts', () => {
  
  it('should display message when no similar products are found', () => {
    render(<SimilarProducts data={[]} />); 

    expect(screen.getByText(/No similar products found for this product/i)).toBeInTheDocument();
  });
});