import React from 'react';
import Card from './Card.js';
import { CurrentUserContext } from '../contexts//CurrentUserContext.js';

function Main({onEditProfile, onAddPlace, onEditAvatar, onCardClick, onCardLike, cards, onCardDelete}) {

  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="main page__container">
      <section className="profile">
        <div className="profile__content">
          <div className="profile__image-edit-pencil">
            <img className="profile__image" onClick={onEditAvatar} src={currentUser.avatar} alt="Аватар пользователя"/>
          </div>
          <div className="profile__text">
            <h1 className="profile__name">{currentUser.name}</h1>
            <button className="profile__edit-button" type="button" onClick={onEditProfile}></button>
            <p className="profile__description">{currentUser.about}</p>
          </div>
        </div>
        <button className="profile__add-button" type="button" onClick={onAddPlace}></button>
      </section>
      <section className="cards" aria-label="Места России">
        <ul className="cards__list">
          {cards.map((card) => {
            return <Card card={card} key={card._id} onCardClick={onCardClick} onCardLike={onCardLike} onCardDelete={onCardDelete}/>
          })}
        </ul>
      </section>
    </main>
  )
}

export default Main;
