import logo from "../images/logo.svg";
import { Link, Switch, Route } from "react-router-dom";

function Header({ email, onLogOut }) {
  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="логотип Место Россия" />
      <Switch>
        <Route exact path="/">
          <nav className="header__navigation header__navigation_logged">
            <p className="header__email">{email}</p>
            <button type="button" onClick={onLogOut} className="header__button">
              Выйти
            </button>
          </nav>
        </Route>
        <Route path="/sign-in">
          <nav className="header__navigation">
            <Link to="/sign-up" className="header__link">
              Регистрация
            </Link>
          </nav>
        </Route>
        <Route path="/sign-up">
          <nav className="header__navigation">
            <Link to="/sign-in" className="header__link">
              Войти
            </Link>
          </nav>
        </Route>
      </Switch>
    </header>
  );
}

export default Header;
