import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { renderWithRouterAndRedux } from './helpers/renderWith';
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

    // const totalParagraph = screen.getByTestId('total-field');
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
    await waitFor(() => {
      userEvent.type(valueInput, '10');
      userEvent.selectOptions(currencyInput, ['USD']);
      userEvent.selectOptions(methodInput, ['Cartão de crédito']);
      userEvent.selectOptions(tagInput, ['Lazer']);
      userEvent.type(descriptionInput, 'Skin no lol2');
      userEvent.click(addExpensesButton);
    });

    await waitFor(() => {
      expect(store.getState().wallet.expenses).toHaveLength(1);
      console.log(store.getState().wallet.expenses);
    });

    const valueExpense = screen.getByText('52,09');
    const currencyExpense = screen.getByText('USD');
    const methodExpense = screen.getByText('Cartão de Crédito');
    const tagExpense = screen.getByText('Lazer');
    const descriptionExpense = screen.getByText('Skin no lol');

    expect(valueExpense).toBeInTheDocument();
    expect(currencyExpense).toBeInTheDocument();
    expect(methodExpense).toBeInTheDocument();
    expect(tagExpense).toBeInTheDocument();
    expect(descriptionExpense).toBeInTheDocument();

    // await waitFor(() => {
    //   expect(totalParagraph).toHaveTextContent('52.09');
    // });
    // expect(store.getState().wallet.expenses).toEqual(50);
  });
  // it('Testa se ao adicionar uma despesa, ela aparece na tabela', async () => {
  //   const { store } = renderWithRouterAndRedux(<Wallet />);

  //   const valueInput = screen.getByTestId('value-input');
  //   const currencyInput = screen.getByTestId('currency-input');
  //   const methodInput = screen.getByTestId('method-input');
  //   const tagInput = screen.getByTestId('tag-input');
  //   const descriptionInput = screen.getByTestId('description-input');
  //   const addExpensesButton = screen.getByText('Adicionar despesa');

  //   expect(valueInput).toBeInTheDocument();
  //   expect(currencyInput).toBeInTheDocument();
  //   expect(methodInput).toBeInTheDocument();
  //   expect(tagInput).toBeInTheDocument();
  //   expect(descriptionInput).toBeInTheDocument();
  //   expect(addExpensesButton).toBeInTheDocument();

  //   await waitFor(() => {
  //     expect(global.fetch).toHaveBeenCalledTimes(1);
  //   });
  //   await waitFor(() => {
  //     userEvent.type(valueInput, '10');
  //     userEvent.selectOptions(currencyInput, ['USD']);
  //     userEvent.selectOptions(methodInput, ['Cartão de crédito']);
  //     userEvent.selectOptions(tagInput, ['Lazer']);
  //     userEvent.type(descriptionInput, 'Skin no lol');
  //     userEvent.click(addExpensesButton);
  //   });

  //   await waitFor(() => {
  //     const valueExpense = screen.getByText('52,09');
  //     const currencyExpense = screen.getByText('USD');
  //     const methodExpense = screen.getByText('Cartão de Crédito');
  //     const tagExpense = screen.getByText('Lazer');
  //     const descriptionExpense = screen.getByText('Skin no lol');

  //     expect(valueExpense).toBeInTheDocument();
  //     expect(currencyExpense).toBeInTheDocument();
  //     expect(methodExpense).toBeInTheDocument();
  //     expect(tagExpense).toBeInTheDocument();
  //     expect(descriptionExpense).toBeInTheDocument();
  //   });
  // });
});
