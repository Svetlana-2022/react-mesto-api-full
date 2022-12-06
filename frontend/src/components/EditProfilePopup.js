import React from "react";
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup(props) {
    const currentUser = React.useContext(CurrentUserContext);
    const [name, setName] = React.useState(currentUser.name || '');
    const [description, setDescription] = React.useState(currentUser.about || '');

    // После загрузки текущего пользователя из API
    // его данные будут использованы в управляемых компонентах.
    React.useEffect(() => {
        setName(currentUser.name || '');
        setDescription(currentUser.about || '');
    }, [currentUser, props.isOpen]);

    function handleName(e) {
        setName(e.target.value);   
    }
    function handleDescription(e) {
        setDescription(e.target.value);   
    }
    function handleSubmit(e) {
        e.preventDefault();
      
        // Передаём значения управляемых компонентов во внешний обработчик
        props.onUpdateUser({
          name: name,
          about: description,
        });
      }
    
    return (
        <PopupWithForm onSubmit={(e)=>handleSubmit(e)} title="Редактировать профиль" name="edit" buttonText="Сохранить" isOpen ={props.isOpen} onClose={props.onClose}>
            <input id="name-input" type="text" value={name} onChange={(e)=>handleName(e)} className="form__input form__input_type_name" placeholder="Имя" name="nameInput" minLength="2" maxLength="40" required/>
            <span className="form__input-error name-input-error" ></span>
            <input id="name-job" type="text" value={description} onChange={(e)=>handleDescription(e)} className="form__input form__input_type_job" placeholder="О себе" name="jobInput" minLength="2" maxLength="200" required/>
            <span className="form__input-error name-job-error"></span>
        </PopupWithForm>
    )
}

export default EditProfilePopup;
