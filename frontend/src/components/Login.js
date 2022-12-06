import React, { useState } from "react";


const Login = ({ onLogin }) => {
    const [state, setState] = useState({
        password: '',
        email: ''
    })
    
    const handleChange = (e) => {
        const {name, value} = e.target;
        setState({
            ...state,
            [name]: value
        });
    }
    const handleSubmit = (e) =>{
        e.preventDefault();
        const {password, email} = state;
        if(!password || !email) return;

        onLogin(password, email);
    }
    
    return (
        <div className="login">
            <h3 className="login__title">Вход</h3>
            <form  onSubmit={handleSubmit} className="form form_type_login" name="text">
                <input id="email" type="email" value={state.email} onChange={handleChange} className="form__input form__input_type_email" placeholder="Email" name="email" minLength="2" maxLength="40" required/>
                <input id="password" type="password" value={state.password} onChange={handleChange} className="form__input form__input_type_password" placeholder="Пароль" name="password" minLength="2" maxLength="200" required/>
                <button type="submit" className="form__submit-button form__submit-button_type_login">Войти</button>
            </form>
        </div>

    )
    
}

export default Login;

