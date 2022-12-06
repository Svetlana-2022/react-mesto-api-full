import React from "react";

function PopupWithForm (props) {
    const popupClassName = props.isOpen ? 'popup_opened' : '';
    return (
        <div className={`popup popup_for_${props.name} ${popupClassName}`} > 
        <div className="popup__container">
            <button type="button" className={`popup__close-icon popup__close-icon_for_${props.name}`} onClick={props.onClose}></button>
            <h3 className="popup__title">{props.title}</h3>
            <form  onSubmit={props.onSubmit} className={`form form_for_${props.name}`} name="text" noValidate>
                {props.children}
                <button type="submit" className="form__submit-button">{props.buttonText}</button>
            </form>
        </div>
    </div>
    )
}

export default PopupWithForm;