import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Table extends Component {
  render() {
    const { expenses } = this.props;
    // const exchangeInfo = expenses
    //   .map((expense) => expense.exchangeRates[expense.currency]);
    // console.log(exchangeInfo[0]);
    const expense1 = expenses.map((expense) => expense);
    // console.log('Expense', expense1);

    // const expenseInfo = expenses.map((expense) => expense);
    // console.log(expenseInfo);
    return (
      <div>
        <table>
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
          {
            expense1.map((expense) => (
              <tbody key={ expense1.code }>
                <tr key={ expense1.code }>
                  <td key={ expense1.code }>{expense.description}</td>
                  <td key={ expense1.code }>{expense.tag}</td>
                  <td key={ expense1.code }>{expense.method}</td>
                  <td key={ expense1.code }>{Number(expense.value).toFixed(2)}</td>
                  <td key={ expense1.code }>
                    {expense.exchangeRates[expense.currency].name}
                  </td>
                  <td key={ expense1.code }>
                    {Number(expense.exchangeRates[expense.currency].ask).toFixed(2)}
                  </td>
                  <td key={ expense1.code }>
                    {
                      Number(
                        expense.value * expense.exchangeRates[expense.currency].ask,
                      ).toFixed(2)
                    }
                  </td>
                  <td key={ expense1.code }>Real</td>
                  <td key={ expense1.code }>Editar/Excluir</td>
                </tr>
              </tbody>
            ))
          }
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
};

export default connect(mapStateToProps)(Table);
