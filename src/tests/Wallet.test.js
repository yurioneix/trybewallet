import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import Wallet from '../pages/Wallet';

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
  it('Testa se ao adicionar uma despesa, o valor total das despesas muda no Header', () => {
    const { store } = renderWithRouterAndRedux(<Wallet />);

    const totalParagraph = screen.getByTestId('total-field');
    const valueInput = screen.getByLabelText('Valor:');
    const currencyInput = screen.getByLabelText('Moeda:');
    const methodInput = screen.getByLabelText('Método de pagamento:');
    const tagInput = screen.getByTestId('tag-input');
    const descriptionInput = screen.getByLabelText('Descrição:');
    const addExpensesButton = screen.getByText('Adicionar despesa');

    expect(valueInput).toBeInTheDocument();
    expect(currencyInput).toBeInTheDocument();
    expect(methodInput).toBeInTheDocument();
    expect(tagInput).toBeInTheDocument();
    expect(descriptionInput).toBeInTheDocument();
    expect(addExpensesButton).toBeInTheDocument();

    userEvent.type(valueInput, 50);
    userEvent.selectOptions(currencyInput, [1]);
    userEvent.selectOptions(methodInput, [1]);
    userEvent.selectOptions(tagInput, [1]);
    userEvent.type('Skin no lol');
    userEvent.click(addExpensesButton);

    expect(store.getState().wallet.expenses).toEqual(50);

    expect(totalParagraph).toHaveTextContent('50');
  });
});
