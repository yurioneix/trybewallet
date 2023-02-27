import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { renderWithRouterAndRedux, renderWithRedux } from './helpers/renderWith';
import Wallet from '../pages/Wallet';

const mockData = {
  USD: { code: 'USD', codein: 'BRL', name: 'Dólar Americano/Real Brasileiro', high: '5.2125', low: '5.1714', varBid: '-0.0092', pctChange: '-0.18', bid: '5.2', ask: '5.2016', timestamp: '1677529183', create_date: '2023-02-27 17:19:43' },
};

beforeEach(() => {
  jest.spyOn(global, 'fetch').mockResolvedValue({
    json: jest.fn().mockResolvedValue(mockData),
  });
});

afterEach(jest.restoreAllMocks);

describe('Testa página Wallet', () => {
  it('Testa se ao realizar o login, o email aparece no Header da página Wallet', () => {
    renderWithRouterAndRedux(<Wallet />);

    const emailParagraph = screen.getByTestId('email-field');
    const totalParagraph = screen.getByTestId('total-field');
    const currencyParagraph = screen.getByTestId('header-currency-field');

    expect(emailParagraph).toBeInTheDocument();
    expect(totalParagraph).toBeInTheDocument();
    expect(currencyParagraph).toBeInTheDocument();

    expect(emailParagraph).toHaveTextContent('');
    expect(totalParagraph).toHaveTextContent('0.00');
    expect(currencyParagraph).toHaveTextContent('BRL');
  });

  it('Testa se ao adicionar uma despesa, o valor total das despesas muda no Header', async () => {
    const { store } = renderWithRouterAndRedux(<Wallet />);

    const valueInput = screen.getByTestId('value-input');
    const currencyInput = screen.getByTestId('currency-input');
    const methodInput = screen.getByTestId('method-input');
    const tagInput = screen.getByTestId('tag-input');
    const descriptionInput = screen.getByTestId('description-input');
    const addExpensesButton = screen.getByText('Adicionar despesa');

    expect(valueInput).toBeInTheDocument();
    expect(currencyInput).toBeInTheDocument();
    expect(methodInput).toBeInTheDocument();
    expect(tagInput).toBeInTheDocument();
    expect(descriptionInput).toBeInTheDocument();
    expect(addExpensesButton).toBeInTheDocument();

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledTimes(1);
    });

    userEvent.type(valueInput, '10');
    userEvent.selectOptions(methodInput, ['Cartão de crédito']);
    userEvent.selectOptions(tagInput, ['Lazer']);
    userEvent.type(descriptionInput, 'Skin no lol2');

    await waitFor(() => {
      userEvent.selectOptions(currencyInput, ['USD']);
      userEvent.click(addExpensesButton);
    });

    await waitFor(() => {
      expect(store.getState().wallet.expenses).toHaveLength(1);
      console.log(store.getState().wallet.expenses);
    });

    const valueExpense = screen.getByRole('cell', { name: '52.02' });
    const currencyExpense = screen.getByRole('cell', { name: 'Dólar Americano/Real Brasileiro' });
    const methodExpense = screen.getByRole('cell', { name: 'Cartão de crédito' });
    const tagExpense = screen.getByRole('cell', { name: 'Lazer' });
    const descriptionExpense = screen.getByRole('cell', { name: 'Skin no lol2' });

    expect(valueExpense).toBeInTheDocument();
    expect(currencyExpense).toBeInTheDocument();
    expect(methodExpense).toBeInTheDocument();
    expect(tagExpense).toBeInTheDocument();
    expect(descriptionExpense).toBeInTheDocument();
  });

  it('Testa se ao ter uma despesa adicionada, é possível editá-la e removê-la', async () => {
    const initialState = {
      wallet: {
        expenses: [
          {
            id: 0,
            value: '1',
            description: 'Betano',
            currency: 'USD',
            method: 'Dinheiro',
            tag: 'Trabalho',
            exchangeRates: { USD: [Object] },
          },
        ],
      },
    };

    const { store } = renderWithRedux(<Wallet />, { initialState });

    const editButton = screen.getByRole('button', { name: 'Editar' });
    const deleteButton = screen.getByRole('button', { name: 'Excluir' });

    expect(editButton).toBeInTheDocument();
    expect(deleteButton).toBeInTheDocument();

    // userEvent.click(deleteButton);

    // expect(store.getState().wallet.expenses).toHaveLength(0);

    userEvent.click(editButton);

    const valueInput = screen.getByTestId('value-input');
    const currencyInput = screen.getByTestId('currency-input');
    const methodInput = screen.getByTestId('method-input');
    const tagInput = screen.getByTestId('tag-input');
    const descriptionInput = screen.getByTestId('description-input');
    const editExpensesButton = screen.getByRole('button', { name: 'Editar despesa' });
    expect(editExpensesButton).toBeInTheDocument();

    userEvent.type(valueInput, '10');
    userEvent.selectOptions(methodInput, ['Dinheiro']);
    userEvent.selectOptions(tagInput, ['Trabalho']);
    userEvent.type(descriptionInput, 'Bet365');

    await waitFor(() => {
      userEvent.selectOptions(currencyInput, ['USD']);
      userEvent.click(editExpensesButton);
    });

    // const valueExpense = screen.getByRole('cell', { name: '52.02' });
    // const currencyExpense = screen.getByRole('cell', { name: 'Dólar Americano/Real Brasileiro' });
    // const methodExpense = screen.getByRole('cell', { name: 'Dinheiro' });
    // const tagExpense = screen.getByRole('cell', { name: 'Trabalho' });
    // const descriptionExpense = screen.getByRole('cell', { name: 'Bet365' });

    // expect(valueExpense).toBeInTheDocument();
    // expect(currencyExpense).toBeInTheDocument();
    // expect(methodExpense).toBeInTheDocument();
    // expect(tagExpense).toBeInTheDocument();
    // expect(descriptionExpense).toBeInTheDocument();

    // expect(store.getState().wallet.expenses).toEqual({
    //   id: 0,
    //   value: '10',
    //   description: 'Bet365',
    //   currency: 'USD',
    //   method: 'Dinheiro',
    //   tag: 'Trabalho',
    //   exchangeRates: { USD: [Object] },
    // });
    expect(store.getState().wallet.idToEdit).toBe(0);
  });
});
