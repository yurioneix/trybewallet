import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteExpenses, editExpenses } from '../redux/actions';

class Table extends Component {
  handleClick = (id) => {
    const { dispatch, expenses } = this.props;
    dispatch(deleteExpenses(expenses, id));
  };

  handleEdit = (id) => {
    console.log(id);
    const { dispatch } = this.props;
    dispatch(editExpenses(id));
  };

  render() {
    const { expenses } = this.props;
    const expenseTable = expenses.map((expense) => expense);
    return (
      <div>
        <table>
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Tag</th>
              <th>Método de pagamento</th>
              <th>Valor</th>
              <th>Moeda</th>
              <th>Câmbio utilizado</th>
              <th>Valor convertido</th>
              <th>Moeda de conversão</th>
              <th>Editar/Excluir</th>
            </tr>
          </thead>
          <tbody>

            {
              expenseTable.map((expense) => (
              // <tbody key={ expenseTable.code }>
                <tr key={ expense.id }>
                  <td key={ expense.id }>{expense.description}</td>
                  <td key={ expense.id }>{expense.tag}</td>
                  <td key={ expense.id }>{expense.method}</td>
                  <td key={ expense.id }>{Number(expense.value).toFixed(2)}</td>
                  <td key={ expense.id }>
                    {expense.exchangeRates[expense.currency].name}
                  </td>
                  <td key={ expense.id }>
                    {Number(expense.exchangeRates[expense.currency].ask).toFixed(2)}
                  </td>
                  <td key={ expense.id }>
                    {
                      Number(
                        expense.value * expense.exchangeRates[expense.currency].ask,
                      ).toFixed(2)
                    }
                  </td>
                  <td key={ expense.id }>Real</td>
                  <td key={ expense.id }>
                    <button
                      data-testid="edit-btn"
                      onClick={ () => this.handleEdit(expense.id) }
                    >
                      Editar
                    </button>
                    <button
                      data-testid="delete-btn"
                      onClick={ () => this.handleClick(expense.id) }
                      key={ expense.id }
                    >
                      Excluir

                    </button>
                  </td>
                </tr>
              // </tbody>
              ))
            }
          </tbody>
        </table>

      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

Table.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    value: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    currency: PropTypes.string.isRequired,
    method: PropTypes.string.isRequired,
    tag: PropTypes.string.isRequired,
    exchangeRates: PropTypes.shape().isRequired,
  })).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(Table);
