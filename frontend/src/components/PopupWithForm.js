function PopupWithForm({name, title, buttonText, isOpen, onClose, children, onSubmit}) {

  return (
    <div className={`popup popup_type_${name} ${isOpen && 'popup_opened'}`}>
      <div className="popup__container">
        <h2 className="popup__title">{title}</h2>
        <form className="popup__form" onSubmit={onSubmit} name={name} noValidate>
          {children}
          <button className="popup__button" name={name} type="submit">{buttonText}</button>
        </form>
        <button className="popup__close" onClick={onClose} type="button"></button>
      </div>
    </div>
  )
}

export default PopupWithForm;
