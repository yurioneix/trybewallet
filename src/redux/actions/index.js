// Coloque aqui suas actions
export const ADD_EMAIL = 'ADD_EMAIL';
export const SEND_CURRENCIES = 'SEND_CURRENCIES';
export const SAVE_EXPENSES = 'SAVE_EXPENSES';
export const SAVE_EXCHANGES = 'SAVE_EXCHANGES';
export const DELETE_EXPENSES = 'DELETE_EXPENSES';

export const addEmail = (email) => ({
  type: ADD_EMAIL,
  email,
});

export const sendCurrencies = (currencies) => ({
  type: SEND_CURRENCIES,
  currencies,
});

export const saveExpenses = (expenses) => ({
  type: SAVE_EXPENSES,
  expenses,
});

export const saveExchanges = (exchangeRates) => ({
  type: SAVE_EXCHANGES,
  exchangeRates,
});

export const deleteExpenses = (expenses, id) => ({
  type: DELETE_EXPENSES,
  expenses,
  id,
});

export function fetchCurrencies() {
  return (dispatch) => fetch('https://economia.awesomeapi.com.br/json/all')
    .then((response) => response.json())
    .then((data) => {
      const currencies = data;
      delete currencies.USDT;
      dispatch(sendCurrencies(Object.keys(currencies)));
    });
}

export async function fetchExchanges() {
  const response = await fetch('https://economia.awesomeapi.com.br/json/all');
  const data = await response.json();
  return data;
}
