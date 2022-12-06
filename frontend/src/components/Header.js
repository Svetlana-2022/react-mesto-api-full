import React from "react";
import logo from '../images/Vector(1).svg';
import { Link } from 'react-router-dom';
import { Switch, Route } from 'react-router-dom';


function Header(props) {

    return (
        <Switch>
            <Route exact path="/"> 
                <div className="header">
                    <img className="header__logo" src={logo} alt="логотип"/>
                    <div className="header__link header__link-container">
                        <p className="header__email">{props.userData.email}</p>
                        <button onClick={props.signOut} className="header__link-button">Выйти</button>
                    </div>
                </div>
            </Route>
            <Route path="/sign-in"> 
                <div className="header">
                    <img className="header__logo" src={logo} alt="логотип"/>
                    <Link to="/sign-up" className="header__link">Регистрация</Link>
                </div>
            </Route>
            <Route path="/sign-up"> 
                <div className="header">
                    <img className="header__logo" src={logo} alt="логотип"/>
                    <Link to="/sign-in" className="header__link">Войти</Link>
                </div>
            </Route>
        </Switch>
    );
}

export default Header;