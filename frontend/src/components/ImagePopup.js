function ImagePopup({card, onClose}) {

  if (!card) return null;

  return (
    <div className={`popup ${card && 'popup_opened'}`}>
      <div className="popup__image-container">
        <img className="popup__popup-image" src={card.link} alt="Увеличенное фото"/>
        <button className="popup__close" onClick={onClose}type="button"></button>
        <h2 className="popup__image-title">{card.name}</h2>
      </div>
    </div>
  )
}

export default ImagePopup;
