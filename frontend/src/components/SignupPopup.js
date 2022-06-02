import React from 'react';
import success from '../images/signup-true.svg'
import error from '../images/signup-error.svg'

const SignupPopup = ({ isOpen, onClose, regStatus }) => {
  return (
    <div className={`popup ${isOpen && 'popup_opened'}`}>
      <div className="popup__container popup__container_type_signup">
        <img src={regStatus ? success : error} alt={regStatus ? success : error} />
        <h2 className="popup__title popup__title_type_signup">
          { regStatus
            ? `Вы успешно зарегистрировались!`
            : `Что-то пошло не так! Попробуйте ещё раз.`}
        </h2>
        <button className="popup__close" onClick={onClose} type="button"></button>
      </div>
    </div>
  );
};

export default SignupPopup;
