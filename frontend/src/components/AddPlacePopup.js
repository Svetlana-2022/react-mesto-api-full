import React from "react";
import PopupWithForm from './PopupWithForm';


function AddPlacePopup(props) {
    const [link, setLink] = React.useState('');
    const [name, setName] = React.useState('');

    function handleName(e) {
        setName(e.target.value);   
    }
    function handleLink(e) {
        setLink(e.target.value);   
    }
    function handleSubmit(e) {
        e.preventDefault();
      
        props.onAddPlace({
          name: name,
          link: link,
        });
        setName('');
        setLink('');
      }
    
    return (
        <PopupWithForm  onSubmit={(e)=>handleSubmit(e)} title="Новое место" name="card" buttonText="Создать" isOpen ={props.isOpen} onClose={props.onClose}>
            <input id="name-card" type="text" value={name} onChange={(e)=>handleName(e)} className="form__input form__input_type_title" placeholder="Название" name="nameCard" minLength="2" maxLength="30" required/>
            <span className="form__input-error name-card-error"></span>
            <input id="link-card" type="url" value={link} onChange={(e)=>handleLink(e)} className="form__input form__input_type_link" placeholder="Ссылка на картинку" name="linkCard" required/>
            <span className="form__input-error link-card-error"></span> 
        </PopupWithForm>
    )
}

export default AddPlacePopup;