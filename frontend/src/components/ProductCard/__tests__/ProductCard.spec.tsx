import { render, screen } from '@testing-library/react';
import { Product } from 'types/Product';
import { ProductCard } from '..';

describe('ProductCard tests', () => {
  it('should render card with given product', () => {
    const product: Product = {
      id: 1,
      name: 'Computador',
      description: 'Computador muito legal',
      price: 2100.32,
      categories: [{ id: 1, name: 'Eletrônicos' }],
      date: Date.now().toString(),
      imgUrl: 'https://m.media-amazon.com/images/I/816S1xdqVEL._AC_SY450_.jpg',
    };

    render(<ProductCard product={product} />);
    expect(screen.getByText('Computador')).toBeInTheDocument();
  });

  it('should render card with given image', () => {
    const product: Product = {
      id: 1,
      name: 'Computador',
      description: 'Computador muito legal',
      price: 2100.32,
      categories: [{ id: 1, name: 'Eletrônicos' }],
      date: Date.now().toString(),
      imgUrl: 'https://m.media-amazon.com/images/I/816S1xdqVEL._AC_SY450_.jpg',
    };

    render(<ProductCard product={product} />);
    expect(screen.getByAltText('Computador')).toBeInTheDocument();
  });
  it('should render price with R$', () => {
    const product: Product = {
      id: 1,
      name: 'Computador',
      description: 'Computador muito legal',
      price: 2100.32,
      categories: [{ id: 1, name: 'Eletrônicos' }],
      date: Date.now().toString(),
      imgUrl: 'https://m.media-amazon.com/images/I/816S1xdqVEL._AC_SY450_.jpg',
    };

    render(<ProductCard product={product} />);
    expect(screen.getByText('R$')).toBeInTheDocument();
  });

  it('should render price with two decimals and separated by comma', () => {
    const product: Product = {
      id: 1,
      name: 'Computador',
      description: 'Computador muito legal',
      price: 2100.1,
      categories: [{ id: 1, name: 'Eletrônicos' }],
      date: Date.now().toString(),
      imgUrl: 'https://m.media-amazon.com/images/I/816S1xdqVEL._AC_SY450_.jpg',
    };

    render(<ProductCard product={product} />);
    expect(screen.getByText('2.100,10')).toBeInTheDocument();
  });
});

export {};
