import React, {useEffect} from 'react';
import { Redirect, Route, Switch, useHistory } from 'react-router-dom';
import ProtectedRoute from "./ProtectedRoute.js";
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import ImagePopup from './ImagePopup.js';
import api from '../utils/Api.js';
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import AddPlacePopup from './AddPlacePopup.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import DeletePopup from './DeletePopup.js';
import Login from "./Login";
import Register from "./Register";
import * as auth from "../utils/Auth";
import SignupPopup from "./SignupPopup";


function App() {

  const history = useHistory();
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = React.useState(false);
  const [isSignupPopupOpen, setIsSignupPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [cardForDelete, setCardForDelete] = React.useState(null);
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [regStatus, setRegStatus] = React.useState(null);
  const [authData, setAuthData] = React.useState({
    email: "",
    password: "",
  })

  function fetchInitialCards() {
            api.getInitialCards()
           .then((data) => {
             setCards(data);
           })
           .catch((data) =>{
             console.log(data)
           })
  }

  function fetchUserInfo() {
            api.getUserInfo()
           .then((data) => {
              setCurrentUser(data);
           })
           .catch((data) =>{
            console.log(data)
          })
  }

  function tokenCheck() {
    const jwt = localStorage.getItem('jwt')
    if (jwt) {
      return auth.getContent(jwt)
        .then((data) => {
          setAuthData({
            ...authData,
            email: data.data.email,
          });
          setLoggedIn(true);
          console.log(loggedIn)
          history.push( "/" );
        })
        .catch(res => console.log(res))
    }
  }

  React.useEffect(() => {
    console.log(loggedIn)
    if (loggedIn) {

      fetchInitialCards();
      fetchUserInfo();
    }
  }, [loggedIn])

  useEffect(() => {
    tokenCheck();
  }, [loggedIn]);

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  }

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  }

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  }

  const handleCardClick = (card) => {
    setSelectedCard(card);
  }

  const handleDeleteButtonClick = (card) => {
    setIsDeletePopupOpen(true);
    setCardForDelete(card);
  }

  const handleUpdateUser = (data) => {
    api.patchUserInfo(data)
    .then((data) => {
      setCurrentUser(data);
      closeAllPopups();
    })
    .catch((data) =>{
      console.log(data)
    })
  }

  const handleUpdateAvatar = (data) => {
    api.patchUserAvatar(data)
    .then((data) => {
      setCurrentUser(data);
      closeAllPopups();
    })
    .catch((data) =>{
      console.log(data)
    })
  }

  const handleAddPlaceSubmit = (data) => {
    api.postNewCard(data)
    .then((newCard) => {
      setCards([newCard, ...cards]);
      closeAllPopups();
    })
    .catch((data) =>{
      console.log(data)
    })
  }

  const handleRegister = (email, password) => {
    auth.register(email, password)
      .then(() => {
        history.push("/login");
        setRegStatus(true);
        setIsSignupPopupOpen(true);
      })
      .catch(res => {
        console.log(res);
        setRegStatus(false);
        setIsSignupPopupOpen(true);
      })
  }

  const handleLogin = (email, password) => {
    auth.authorize(email, password)
      .then((data) => {
        localStorage.setItem('jwt', data.token)
        setAuthData({
          ...authData,
          email: data.email,
        });
        setLoggedIn(true);
        console.log(loggedIn)
        history.replace({ pathname: "/" });
      })
      .catch(res => {
        console.log(res);
        setRegStatus(false);
        setIsSignupPopupOpen(true);
      })
  }

  const signOut = () => {
    localStorage.removeItem('jwt');
    setLoggedIn(false);
    history.replace({ pathname: "/sign-in" });
    setAuthData({
      password: '',
      email: ''
    });

  }

  const handleCardLike = (card) => {

    const isLiked = card.likes.some(user => user._id === currentUser._id);

    const setLikeState = (newCard) => {
      setCards((state) =>
        state.map((stateCard) => stateCard._id === card._id ? newCard : stateCard))
    }

    if (isLiked) {

      api.deleteLike(card)
      .then((newCard) => setLikeState(newCard))
      .catch((data) =>{
        console.log(data)
      })

    } else {

      api.putLike(card)
      .then((newCard) => setLikeState(newCard))
      .catch((data) =>{
        console.log(data)
      })
    }
  }

  const handleCardDelete = (card) => {
    api.deleteCard(card)
    .then(() => {
      setCards((state) => state.filter((stateCard) => stateCard._id !== card._id))
      closeAllPopups();
    })
    .catch((data) =>{
      console.log(data)
    })

  }

  const closeAllPopups = () => {
    setIsAddPlacePopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsSignupPopupOpen(false);
    setSelectedCard(null);
    setIsDeletePopupOpen(null);
  }

  const handleSpaceClick = (evt) => {
    if (evt.target.classList.contains('popup_opened')) {
      closeAllPopups();
    }
    if (evt.target.classList.contains('popup__close')) {
      closeAllPopups();
    }
  }

  const handleEscClose = (evt) => {
    if (evt.key === 'Escape') {
      closeAllPopups();
    }
  }


  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page" onClick={handleSpaceClick} onKeyDown={handleEscClose}>
        <Header loggedIn={loggedIn} email={authData.email} signOut={signOut}/>
        <Switch>
          <ProtectedRoute
            exact path='/'
            component={Main}
            loggedIn={loggedIn}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onCardClick={handleCardClick}
            cards={cards}
            onCardLike={handleCardLike}
            onCardDelete={handleDeleteButtonClick}
          />
          <Route path='/sign-in'>
            <Login handleLogin={handleLogin}/>
          </Route>
          <Route path='/sign-up'>
            <Register handleRegister={handleRegister}/>
          </Route>
          <Route path=''>
            {loggedIn ? <Redirect to='/' /> : <Redirect to='/sign-in' />}
          </Route>
        </Switch>
        <Footer />

        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
        <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} />
        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />
        <DeletePopup card={cardForDelete} isOpen={isDeletePopupOpen} onClose={closeAllPopups} onCardDelete={handleCardDelete} />
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
        <SignupPopup isOpen={isSignupPopupOpen} onClose={closeAllPopups} regStatus={regStatus} />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
