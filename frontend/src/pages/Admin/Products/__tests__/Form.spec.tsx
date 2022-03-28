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
  it('should show toast and redirect when submit form correctly', async () => {
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

  it('should show 5 validation messages when just click submit', async () => {
    render(
      <BrowserRouter>
        <Form />
      </BrowserRouter>
    );

    const submitButton = screen.getByRole('button', { name: /salvar/i });

    userEvent.click(submitButton);

    await waitFor(() => {
      const messages = screen.getAllByText('Campo obrigatório');

      expect(messages).toHaveLength(5);
    });
  });
  it('should clear validation messages when filling out the form', async () => {
    render(
      <BrowserRouter>
        <Form />
      </BrowserRouter>
    );

    const submitButton = screen.getByRole('button', { name: /salvar/i });

    userEvent.click(submitButton);

    await waitFor(() => {
      const messages = screen.getAllByText('Campo obrigatório');

      expect(messages).toHaveLength(5);
    });

    const nameInput = screen.getByTestId('name');
    const price = screen.getByTestId('price');
    const imgUrl = screen.getByTestId('imgUrl');
    const description = screen.getByTestId('description');
    const categoriesInput = screen.getByLabelText('categorias');

    await selectEvent.select(categoriesInput, ['Eletrônicos', 'Computadores']);
    userEvent.type(nameInput, 'Computador');
    userEvent.type(price, '5000.12');
    userEvent.type(imgUrl, 'image.jpg');
    userEvent.type(description, 'Computador muito bom!');

    await waitFor(() => {
        const messages = screen.queryAllByText('Campo obrigatório');
  
        expect(messages).toHaveLength(0);
      });

  });
});
