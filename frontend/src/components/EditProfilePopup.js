import React from 'react';
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function EditProfilePopup({isOpen, onClose, onUpdateUser}) {

  const currentUser = React.useContext(CurrentUserContext);

  const [nickname, setNickname] = React.useState('');
  const [description, setDescription] = React.useState('');

  const handleChangeName = (evt) => {
    setNickname(evt.target.value);
  }

  const handleChangeDescription = (evt) => {
    setDescription(evt.target.value);
  }

  const handleSubmit = (evt) => {

    evt.preventDefault();

    onUpdateUser({
      name: nickname,
      about: description,
    });
  }

  React.useEffect(() => {
    setNickname(currentUser.name || '');
    setDescription(currentUser.about || '');
  }, [currentUser, isOpen]);

  return (
    <PopupWithForm name="profile" title="Редактировать профиль" buttonText="Сохранить" isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit}>
        <input  className="popup__input"
                value={nickname}
                onChange={handleChangeName}
                type="text"
                id="nickname"
                name="nickname"
                placeholder=""
                minLength="2"
                maxLength="40"
                required/>
        <span className="popup__error" id="nickname-error"></span>
        <input  className="popup__input"
                value={description}
                onChange={handleChangeDescription}
                type="text"
                id="description"
                name="description"
                placeholder=""
                minLength="2"
                maxLength="200"
                required/>
        <span className="popup__error" id="description-error"></span>
      </PopupWithForm>
  )
}

export default EditProfilePopup;
