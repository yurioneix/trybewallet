import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import Login from '../pages/Login';

describe('Testa página de Login', () => {
  it('Testa se os campos de email e senha estão na tela', () => {
    renderWithRouterAndRedux(<Login />);

    const name = screen.getByTestId(/email-input/i);
    expect(name).toBeInTheDocument();

    const password = screen.getByTestId(/password-input/i);
    expect(password).toBeInTheDocument();
  });
  it('Testa se é possível digitar nos campos de email e senha', () => {
    renderWithRouterAndRedux(<Login />);

    const name = screen.getByTestId(/email-input/i);
    const password = screen.getByTestId(/password-input/i);
    const loginButton = screen.getByText('Entrar');

    expect(loginButton).toBeInTheDocument();
    expect(loginButton).toBeDisabled();

    userEvent.type(name, 'yurioneix18@gmail.com');
    userEvent.type(password, '12345678');

    expect(name.value).toBe('yurioneix18@gmail.com');
    expect(password.value).toBe('12345678');
    expect(loginButton).toBeEnabled();

    userEvent.click(loginButton);

    // const username = screen.getByTestId('email-field');
    // expect(username).toBeInTheDocument();
    // const { pathname } = history.location;
    // expect(pathname).toBe('/carteira');
  });
});
