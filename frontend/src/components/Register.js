import React, { useState } from "react";
import { Link } from 'react-router-dom';

const Register = ({ onRegister }) => {
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
    const handleSubmit = (e)=>{
        e.preventDefault();
        const { password, email } = state;

        onRegister(password, email);
    }
    
    return (
        <div className="register">
            <h3 className="register__title">Регистрация</h3>
            <form  onSubmit={handleSubmit} className="form form_type_register" name="text">
                <input id="email" type="email" value={state.email} onChange={handleChange} className="form__input form__input_type_email" placeholder="Email" name="email" minLength="2" maxLength="40" required/>
                <input id="password" type="password" value={state.password || ''} onChange={handleChange} className="form__input form__input_type_password" placeholder="Пароль" name="password" minLength="2" maxLength="200" required/>
                <button type="submit" className="form__submit-button form__submit-button_type_register">Зарегистрироваться</button>
            </form>
            <div className="register__singin">
                <p>Уже зарегистрированы? 
                    <Link to="/sign-in" className="register__singin-link"> Войти</Link>
                </p>
            </div>
        </div>
    );
    
}
export default Register;