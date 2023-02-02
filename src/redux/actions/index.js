// Coloque aqui suas actions
export const ADD_EMAIL = 'ADD_EMAIL';
export const SEND_CURRENCIES = 'SEND_CURRENCIES';

export const addEmail = (email) => ({
  type: ADD_EMAIL,
  email,
});

export const sendCurrencies = (currencies) => ({
  type: SEND_CURRENCIES,
  currencies,
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
