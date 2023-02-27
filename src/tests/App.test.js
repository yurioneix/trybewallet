import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWith';

describe('Testa tela de login', () => {
  it('Testa se existe os inputs de email e senha e se ao digitar um email e senha corretamente, o botão de Entrar é habilitado', () => {
    renderWithRouterAndRedux(<App />);

    const email = screen.getByPlaceholderText(/Email/i);
    const password = screen.getByPlaceholderText(/Senha/i);
    const loginButton = screen.getByText(/Entrar/i);

    expect(email).toBeInTheDocument();
    expect(password).toBeInTheDocument();
    expect(loginButton).toBeInTheDocument();
    expect(loginButton).toBeDisabled();

    userEvent.type(email, 'email@email.com');
    userEvent.type(password, '1234567');

    expect(loginButton).toBeEnabled();
  });
  it('Testa se ao realizar o login, o estado global da aplicação armazena o email da pessoa', () => {
    const { store } = renderWithRouterAndRedux(<App />);

    const email = screen.getByPlaceholderText(/Email/i);
    const password = screen.getByPlaceholderText(/Senha/i);
    const loginButton = screen.getByText(/Entrar/i);

    userEvent.type(email, 'email1@email.com');
    userEvent.type(password, '1234567');
    userEvent.click(loginButton);

    expect(store.getState().user.email).toEqual('email1@email.com');
  });
});
