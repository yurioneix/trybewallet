import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addEmail } from '../redux/actions';

class Login extends React.Component {
  state = {
    email: '',
    password: '',
  };

  handleChange = ({ target }) => {
    const { value, name } = target;

    this.setState({
      [name]: value,
    });
  };

  handleClick = () => {
    const { dispatch, history } = this.props;
    const { email } = this.state;

    dispatch(addEmail(email));
    history.push('/carteira');
  };

  validateLogin = (email, password) => {
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    const validateEmail = emailRegex.test(email);
    const minLength = 6;
    const validateLogin = validateEmail && password.length >= minLength;

    return !validateLogin;
  };

  render() {
    const { email, password } = this.state;
    return (
      <div>
        <label htmlFor="userMail">
          Email:
          <input
            type="email"
            id="userMail"
            placeholder="Email"
            name="email"
            onChange={ this.handleChange }
            data-testid="email-input"
          />
          <label htmlFor="userPassword">
            Senha:
            <input
              type="password"
              id="userPassword"
              placeholder="Senha"
              data-testid="password-input"
              onChange={ this.handleChange }
              name="password"
            />
          </label>
          <button
            type="button"
            id="send"
            onClick={ this.handleClick }
            disabled={ this.validateLogin(email, password) }
          >
            Entrar

          </button>
        </label>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect()(Login);
