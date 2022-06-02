import React from 'react';
import LogOutButton from "./LogOutButton";

const HeaderProfile = ({ email, signOut}) => {
  return (
    <div>
      <span className="header__email">{email}</span>
      <button className="header__signout" onClick={signOut}>Выйти</button>
    </div>
  );
};

export default HeaderProfile;
