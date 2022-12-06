import React from "react";

function ImagePopup(props) {
    const imageClassName = props.isOpen ? 'popup_opened' : '';
    
    return (
        <div className={`popup popup_for_img ${imageClassName}`}>
            <div className="popup__content">
                <button type="button" className="popup__close-icon popup__close-icon_for_img" onClick={props.onClose}></button>
                <img className="popup__el-img" src={props.card.link} alt={props.card.name}/>
                <p className="popup__el-caption">{props.card.name}</p>
            </div>
        </div>
    );
}

export default ImagePopup;