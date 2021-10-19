import React, { useState } from 'react';
import { useHistory as UseHistory } from 'react-router-dom';
import './index.css';
import cookLogo from '../images/cookLogo.png';

export default function Login() {
  const history = UseHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [valid, setValid] = useState(false);

  function handleClick() {
    const user = { email };
    localStorage.setItem('mealsToken', '1');
    localStorage.setItem('cocktailsToken', '1');
    localStorage.setItem('user', JSON.stringify(user));
    history.push('/comidas');
  }

  function isValid() {
    const regex = /(.)(.*)@(.)(.*)\.(...)(.*)/;
    const passNum = 6;
    if (email.match(regex) && password.length >= passNum && valid === false) {
      setValid(true);
    }
  }

  function handleChangeEmail(event) {
    setEmail(event.target.value);
    isValid();
  }

  function handleChangePassword(event) {
    setPassword(event.target.value);
    isValid();
  }

  const button = (
    <button
      className="btn btn-danger"
      disabled
      data-testid="login-submit-btn"
      type="button"
    >
      Entrar
    </button>);

  return (
    <div className="login-panel">
      <img src={ cookLogo } alt="cook_logo" />
      <form>
        <label htmlFor="email" className="input-group mb-3">
          <input
            data-testid="email-input"
            type="email"
            name="email"
            onChange={ (e) => handleChangeEmail(e) }
            className="form-control"
            placeholder="E-mail"
            autoComplete="off"
          />
        </label>
        <label htmlFor="password" className="input-group mb-3">
          <input
            data-testid="password-input"
            type="password"
            name="password"
            onChange={ (e) => handleChangePassword(e) }
            className="form-control"
            placeholder="Senha"
          />
        </label>
        {valid
          ? (
            <button
              data-testid="login-submit-btn"
              type="button"
              onClick={ () => handleClick() }
              className="btn btn-danger"
            >
              Entrar

            </button>)
          : button}
      </form>
    </div>
  );
}
