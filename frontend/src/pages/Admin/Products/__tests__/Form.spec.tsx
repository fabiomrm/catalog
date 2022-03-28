import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter, useParams } from 'react-router-dom';
import selectEvent from 'react-select-event';
import { ToastContainer } from 'react-toastify';
import { Form } from '../Form';
import { server } from './fixtures';

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn(),
}));
describe('Product Form create tests', () => {
  beforeEach(() => {
    (useParams as jest.Mock).mockReturnValue({
      productId: 'create',
    });
  });
  it('should render form', async () => {
    render(
      <BrowserRouter>
        <ToastContainer />
        <Form />
      </BrowserRouter>
    );

    const nameInput = screen.getByTestId('name');
    const price = screen.getByTestId('price');
    const imgUrl = screen.getByTestId('imgUrl');
    const description = screen.getByTestId('description');
    const categoriesInput = screen.getByLabelText('categorias');

    const submitButton = screen.getByRole('button', { name: /salvar/i });

    await selectEvent.select(categoriesInput, ['Eletrônicos', 'Computadores']);
    userEvent.type(nameInput, 'Computador');
    userEvent.type(price, '5000.12');
    userEvent.type(imgUrl, 'image.jpg');
    userEvent.type(description, 'Computador muito bom!');

    userEvent.click(submitButton);

    await waitFor(() => {
      const toastElement = screen.getByText('Produto cadastrado com sucesso!');
      expect(toastElement).toBeInTheDocument();
    });

    expect(window.location.pathname).toEqual('/admin/products');
  });
});
