import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Catalog } from '..';

describe('Catalog tests', () => {
  it('should render Catalog with products', async () => {
    render(
      <BrowserRouter>
        <Catalog />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('PC Gamer Alfa')).toBeInTheDocument();
    });
    // eslint-disable-next-line testing-library/no-debugging-utils
    screen.debug();
  });
});
