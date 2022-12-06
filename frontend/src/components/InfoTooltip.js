import React from "react";

function InfoTooltip (props) {
    const infoClassName = props.isOpen ? 'popup_opened' : '';
    return (
        <div className={`popup popup_for_infoTooltip ${infoClassName}`}> 
            <div className="popup__container popup__container_for_infoTooltip">
                <button type="button" className="popup__close-icon" onClick={props.onClose}></button>
                <div className="popup__info">
                    <img className="popup__icon" src={props.icon} alt="icon"/>
                    <p className="popup__text">{props.text}</p>
                </div> 
            </div>
        </div>
    )
}

export default InfoTooltip;