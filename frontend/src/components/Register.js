import React from 'react';
import {Link} from "react-router-dom";
import SignForm from "./SignForm";

const Register = ({ handleRegister }) => {

  const [data, setData] = React.useState({
    email: '',
    password: ''
  })

  const handleDataChange = (evt) => {
    setData({
      ...data,
      [evt.target.name]: evt.target.value
    })
  }

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const { email, password } = data;
    handleRegister(email, password);
  }

  return (
    <section className="sign">
      <form className="sign__form">
        <h2 className="sign__title">Регистрация</h2>
        <input
          className="sign__input"
          onChange={handleDataChange}
          type="email"
          placeholder="Email"
          name="email"
          id="email"/>
        <span></span>
        <input
          className="sign__input"
          onChange={handleDataChange}
          type="password"
          placeholder="Пароль"
          name="password"
          id="password"/>
        <span></span>
        <button onClick={handleSubmit} className="sign__button">Зарегистрироваться</button>
        <p className="sign__redirect-text">Уже зарегистрированы?
          <Link to="Login.js" className="sign__redirect-link">Войти</Link>
        </p>
      </form>
    </section>
  );
};

export default Register;
