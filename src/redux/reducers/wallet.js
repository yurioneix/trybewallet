// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import {
  DELETE_EXPENSES, EDIT_EXPENSES, SAVE_EDITED_EXPENSES, SAVE_EXPENSES, SEND_CURRENCIES,
} from '../actions';

const INITIAL_STATE = {
  currencies: [], // array de string
  expenses: [], // array de objetos, com cada objeto tendo as chaves id, value, currency, method, tag, description e exchangeRates
  editor: false, // valor booleano que indica de uma despesa está sendo editada
  idToEdit: 0, // valor numérico que armazena o id da despesa que esta sendo editada
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SEND_CURRENCIES:
    return {
      ...state,
      currencies: action.currencies,
    };
  case SAVE_EXPENSES:
    return {
      ...state,
      expenses: [...state.expenses, action.expenses],
    };
  case DELETE_EXPENSES: {
    const { expenses } = state;
    const filteredExpenses = expenses.filter((expense) => expense.id !== action.id);
    return {
      ...state,
      expenses: filteredExpenses,
    };
  }
  case EDIT_EXPENSES: {
    return {
      ...state,
      editor: true,
      idToEdit: action.id,
    };
  }
  case SAVE_EDITED_EXPENSES: {
    // const { expenses, idToEdit } = state;
    // const filterExpenseToEdit = expenses.filter((expense) => expense.id === idToEdit);
    // console.log(filterExpenseToEdit);
    return {
      ...state,
      expenses: [action.expenses],
      editor: false,
    };
  }
  default:
    return state;
  }
};

export default wallet;
