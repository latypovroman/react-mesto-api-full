import logo from '../images/logo.svg';
import React from "react";
import HeaderProfile from "./HeaderProfile";
import {Route, Link, Switch} from "react-router-dom";

function Header({ loggedIn, email, signOut }) {

  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="Логотип Mesto"/>
        <Switch>
          <Route path='/sign-in'>
            <Link className="header__route" to='/sign-up'>Регистрация</Link>
          </Route>
          <Route path='/sign-up'>
            <Link className="header__route" to='/sign-in'>Войти</Link>
          </Route>
        </Switch>
      {loggedIn &&
      <HeaderProfile
        className="header__profile"
        email={email}
        signOut={signOut}
      />}
    </header>
  )
}

export default Header;
