import React from "react";
import PopupWithForm from './PopupWithForm';


function EditAvatarPopup(props){
    const avatarInputRef = React.useRef(null);

    function handleSubmit(e) {
        e.preventDefault();
      
        props.onUpdateAvatar({
          avatar: avatarInputRef.current.value,
        });
        avatarInputRef.current.value = '';
    }

    return (
        <PopupWithForm onSubmit={(e)=>handleSubmit(e)} title="Обновить аватар" name="avatar" buttonText="Сохранить" isOpen ={props.isOpen} onClose={props.onClose}>
            <input ref={avatarInputRef} id="link-avatar" type="url" className="form__input form__input_type_avatar" placeholder="Ссылка на картинку" name="avatar" required/>
            <span className="form__input-error link-avatar-error"></span>
        </PopupWithForm>
    )
}

export default EditAvatarPopup;