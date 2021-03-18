import React from "react";

function Login({ onLogin }) {
  const [data, setData] = React.useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setData({
      ...data,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(data.email, data.password)
  }

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <h3 className="auth-form__title">Вход</h3>
      <input
        id="email"
        name="email"
        type="email"
        value={data.email || ''}
        className="auth-form__input"
        placeholder="email"
        onChange={handleChange}
      ></input>
      <input
        id="password"
        name="password"
        type="password"
        value={data.password || ''} 
        className="auth-form__input"
        placeholder="пароль"
        onChange={handleChange}
      ></input>
      <button type='submit' className="auth-form__button">Войти</button>
    </form>
  );
}

export default Login;
