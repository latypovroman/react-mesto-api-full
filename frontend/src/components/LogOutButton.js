import React from 'react';
import {Link} from "react-router-dom";

const LogOutButton = () => {
  return (
    <Link to="/sign-in">
      Выйти
    </Link>
  );
};

export default LogOutButton;
