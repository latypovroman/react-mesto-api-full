import React from 'react';
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({isOpen, onClose, onAddPlace}) {

  const [title, setTitle] = React.useState('');
  const [link, setLink] = React.useState('');

  React.useEffect(() => {
    setTitle('');
    setLink('');
  }, [isOpen, onClose]);

  const handleChangeTitle = (evt) => {
    setTitle(evt.target.value);
  }

  const handleChangeLink = (evt) => {
    setLink(evt.target.value)
  }

  const handleSubmit = (evt) => {
    evt.preventDefault();

    onAddPlace({
      name: title,
      link: link
    });
  }

  return (
    <PopupWithForm name="add-card" title="Новое место" buttonText="Создать" isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit}>
    <input  className="popup__input"
            value={title}
            onChange={handleChangeTitle}
            type="text"
            id="title"
            name="name"
            placeholder="Название"
            minLength="2"
            maxLength="30"
            required/>
    <span className="popup__error" id="title-error"></span>
    <input  className="popup__input"
            value={link}
            onChange={handleChangeLink}
            type="url"
            id="link"
            name="link"
            placeholder="Ссылка на картинку"
            required/>
    <span className="popup__error" id="link-error"></span>
  </PopupWithForm>
  )
}

export default AddPlacePopup;
