import React from "react";
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';



function Main(props) {
    const currentUser = React.useContext(CurrentUserContext);

    return (
        <main className="content">
            <section className="profile">
                <div className="profile__cover">
                    <img type="button" className="profile__avatar" src={currentUser.avatar} alt="Кусто"/>
                    <div type="button" className="profile__hover-avatar" onClick={props.onEditAvatar}></div>
                </div>
                <div className="profile__info">
                    <h1 className="profile__title">{currentUser.name}</h1>
                    <button type="button" className="profile__edit-button" onClick={props.onEditProfile}></button>
                    <p className="profile__subtitle">{currentUser.about}</p>
                </div>
                <button type="button" className="profile__add-button" onClick={props.onAddPlace}></button>
            </section>
            <section className="groups">
                <ul className="groups__elements">
                    {props.cards.map((card) => {
                        return (
                            <Card
                                key={card._id}
                                card={card}
                                onCardClick={props.onCardClick}
                                onCardLike={props.onCardLike}
                                onCardDelete={props.onCardDelete}
                            />
                        )
                    })}
                </ul>
            </section>
        </main>
    );

}

export default Main;