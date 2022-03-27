import { render, screen } from '@testing-library/react';
import { ProductPrice } from '..';

describe('ProducePrice tests,', () => {
  it('should render with R$ prefix', () => {
    const price = 23.59;

    render(<ProductPrice price={price} />);
    expect(screen.getByText('R$')).toBeInTheDocument();
  });

  it('should render price with two decimals and separated by comma', () => {
    const price = 22;

    render(<ProductPrice price={price} />);
    expect(screen.getByText('22,00')).toBeInTheDocument();
  });
});

export {};
