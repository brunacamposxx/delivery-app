import React, { useState, useEffect, useContext } from 'react';
import { Link, useHistory, Redirect } from 'react-router-dom';
import ErrorLogin from '../components/ErrorLogin';
import Context from '../context/Context';

function Login() {
  const history = useHistory();
  const [isDisable, setIsDisable] = useState(true);
  const user = localStorage.getItem('user');
  const {
    errorMsg, loginFnc, email, password, setEmail, setPassword,
  } = useContext(Context);

  useEffect(() => {
    const isValid = () => {
      const validEmail = email.match(/^[a-z0-9-_.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/ig);
      const minLength = 6;
      const validPassword = password.length >= minLength;
      if (validEmail) {
        if (validPassword) {
          setIsDisable(false);
        }
      } else {
        setIsDisable(true);
      }
    };
    isValid();
  }, [email, password, setIsDisable]);

  return user ? <Redirect to="/customer/products" /> : (
    <form action="">
      <label htmlFor="loginInput">
        Login
        <input
          type="email"
          name="loginInput"
          placeholder="email@trybeer.com.br"
          data-testid="common_login__input-email"
          onChange={ ({ target }) => setEmail(target.value) }
        />
      </label>
      <label htmlFor="passwordInput">
        Senha
        <input
          type="password"
          name="passwordInput"
          placeholder="***********"
          data-testid="common_login__input-password"
          onChange={ ({ target }) => setPassword(target.value) }
        />
      </label>
      <button
        type="button"
        data-testid="common_login__button-login"
        disabled={ isDisable }
        onClick={ () => loginFnc(history) }
      >
        LOGIN
      </button>
      <button
        type="button"
        data-testid="common_login__button-register"
      >
        <Link to="/register">
          Ainda não tenho conta
        </Link>
      </button>
      { errorMsg ? <ErrorLogin /> : '' }
    </form>
  );
}

export default Login;
