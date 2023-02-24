import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  fetchCurrencies, fetchExchanges, saveEditedExpenses, saveExpenses,
} from '../redux/actions';

class WalletForm extends Component {
  state = {
    id: 0,
    value: '',
    description: '',
    currency: 'USD',
    method: 'Dinheiro',
    tag: 'Trabalho',
    exchangeRates: {},
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchCurrencies());
  }

  handleChange = ({ target }) => {
    const { name, value } = target;

    this.setState({
      [name]: value,
    });
  };

  onClick = async () => {
    const { dispatch } = this.props;
    const { id } = this.state;

    const exchange = await fetchExchanges();

    this.setState({
      exchangeRates: exchange,
    }, () => {
      dispatch(saveExpenses({ ...this.state }));
      this.setState({
        id: id + 1,
        value: '',
        description: '',
      });
    });
  };

  handleEditExpenses = () => {
    const { dispatch, idToEdit } = this.props;

    this.setState({
      id: idToEdit,
    }, () => {
      dispatch(saveEditedExpenses({ ...this.state }));
    });

    // dispatch(saveExpenses({ ...this.state }));
  };

  render() {
    const { currencies, editor } = this.props;
    const { value, description } = this.state;
    return (
      <div>
        <label htmlFor="budget">
          {' '}
          Valor:
          <input
            id="budget"
            type="number"
            data-testid="value-input"
            name="value"
            onChange={ this.handleChange }
            value={ value }
          />
        </label>
        <label htmlFor="currency">
          {' '}
          Moeda:
          <select
            id="currency"
            data-testid="currency-input"
            name="currency"
            onChange={ this.handleChange }
          >
            { currencies?.map((currency) => <option key={ currency }>{currency}</option>)}
          </select>
        </label>
        <label htmlFor="method">
          {' '}
          Método de pagamento:
          <select
            id="method"
            data-testid="method-input"
            name="method"
            onChange={ this.handleChange }
          >
            <option>Dinheiro</option>
            <option>Cartão de crédito</option>
            <option>Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="method">
          {' '}
          Categoria:
          <select
            id="tag"
            data-testid="tag-input"
            name="tag"
            onChange={ this.handleChange }
          >
            <option>Alimentação</option>
            <option>Lazer</option>
            <option>Trabalho</option>
            <option>Transporte</option>
            <option>Saúde</option>
          </select>
        </label>
        <label htmlFor="description">
          {' '}
          Descrição:
          <input
            id="description"
            type="text"
            data-testid="description-input"
            name="description"
            onChange={ this.handleChange }
            value={ description }
          />
        </label>
        { editor ? (
          <button
            type="button"
            onClick={ this.handleEditExpenses }
          >
            Editar despesa

          </button>

        ) : (
          <button
            type="button"
            onClick={ this.onClick }
          >
            Adicionar despesa

          </button>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  editor: state.wallet.editor,
  idToEdit: state.wallet.idToEdit,
});

WalletForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  editor: PropTypes.bool.isRequired,
  idToEdit: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(WalletForm);
