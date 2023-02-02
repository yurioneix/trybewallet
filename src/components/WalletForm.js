import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchCurrencies } from '../redux/actions';

class WalletForm extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchCurrencies());
  }

  render() {
    const { currencies } = this.props;
    console.log(currencies);
    return (
      <div>
        <label htmlFor="budget">
          {' '}
          Valor:
          <input id="budget" type="number" data-testid="value-input" />
        </label>
        <label htmlFor="currency">
          {' '}
          Moeda:
          <select
            id="currency"
            data-testid="currency-input"
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
          <input id="description" type="text" data-testid="description-input" />
        </label>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

WalletForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
};

export default connect(mapStateToProps)(WalletForm);
