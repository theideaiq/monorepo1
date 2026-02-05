import { render, screen } from '@testing-library/react';
import { ProductCard } from './ProductCard';
import { describe, it, expect } from 'vitest';
import type { Product } from '@/services/products';

const mockProduct: Product = {
  id: '1',
  title: 'Test Product',
  slug: 'test-product',
  price: 100,
  category: 'Test',
  condition: 'new',
  seller: 'Test Seller',
  rating: 5,
  image: '',
  images: [],
  isVerified: true,
  description: 'Test Description',
  details: {},
  variants: [],
  stock: 10,
};

describe('ProductCard', () => {
  it('uses the design system background color for the image container', () => {
    render(<ProductCard product={mockProduct} />);

    const noImageText = screen.getByText('No Image');
    const container = noImageText.parentElement;

    expect(container).toHaveClass('bg-brand-surface');
    expect(container).not.toHaveClass('bg-[#1a1a1a]');
  });
});
