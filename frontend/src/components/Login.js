import React from 'react';

const Login = ({ handleLogin }) => {

  const [data, setData] = React.useState({
    email: '',
    password: ''
  });

  const handleDataChange = (evt) => {
    setData({
      ...data,
      [evt.target.name]: evt.target.value
    })
  }

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const { email, password } = data
    handleLogin(email, password)
  }

  return (
    <section className="sign">
      <form className="sign__form">
        <h2 className="sign__title">Вход</h2>
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
        <button onClick={handleSubmit} className="sign__button">Войти</button>
      </form>
    </section>
  );
};

export default Login;
