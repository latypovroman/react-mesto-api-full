import React from 'react';
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({isOpen, onClose, onUpdateAvatar}) {

  const avatarRef = React.useRef();

  React.useEffect(() => {
    avatarRef.current.value = '';
  })

  const  handleSubmit = (evt) => {
    evt.preventDefault();
    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  return (
    <PopupWithForm name="user-photo" title="Обновить аватар" buttonText="Сохранить" isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit}>
    <input  className="popup__input"
            ref={avatarRef}
            type="url"
            id="avatar"
            name="link"
            placeholder="Ссылка на аватар"
            required/>
    <span className="popup__error" id="avatar-error"></span>
  </PopupWithForm>
  )
}

export default EditAvatarPopup;
