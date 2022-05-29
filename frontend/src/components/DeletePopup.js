import React from 'react';
import PopupWithForm from "./PopupWithForm";

function DeletePopup({card, isOpen, onClose, onCardDelete}) {

  const handleSubmit = (evt) => {
    evt.preventDefault();

    onCardDelete(card);
  }

  return (
    <PopupWithForm name="delete" title="Вы уверены?" buttonText="Да" isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit}/>
  )
}

export default DeletePopup;
