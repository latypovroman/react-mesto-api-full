import React from 'react';
import { CurrentUserContext } from '../contexts//CurrentUserContext.js';

function Card({card, onCardClick, onCardLike, onCardDelete}) {

  const currentUser = React.useContext(CurrentUserContext);

  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some(user => user._id === currentUser._id);

  const handleClick = () => {
    onCardClick(card);
  }

  const handleLikeClick = () => {
    onCardLike(card);
  }

  const handleDeleteClick = () => {
    onCardDelete(card)
  }

  return (
  <li className="card">
    <img className="card__image" onClick={handleClick} src={card.link} alt={card.name}/>
    <button className={`card__delete ${isOwn && 'card__delete_enabled'}`} onClick={handleDeleteClick}></button>
    <div className="card__panel">
      <h2 className="card__title">{card.name}</h2>
      <div className="card__like">
        <button className={`card__like-btn ${isLiked && 'card__like-btn_active'}`} onClick={handleLikeClick} type="button"></button>
        <span className="card__like-counter">{card.likes.length}</span>
      </div>
    </div>
  </li>
 )
}

export default Card;
