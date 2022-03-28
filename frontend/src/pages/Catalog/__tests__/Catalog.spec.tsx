import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Catalog } from '..';
import { server } from './fixtures';

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
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
