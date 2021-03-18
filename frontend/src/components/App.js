import React from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import Header from "./Header";
import "../index.css";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import RusurePopup from "./RusurePopup";
import { api } from "../utils/api.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import Login from "./Login";
import Register from "./Register";
import InfoTooltip from "./InfoTooltip";
import * as auth from "../utils/auth";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(
    false
  );
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(
    false
  );
  const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false);
  const [isRusurePopupOpen, setIsRusurePopupOpen] = React.useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({
    name: "",
    link: "",
  });
  const [deletedCard, setDeletedCard] = React.useState({});

  const [cards, setCards] = React.useState([]);

  const [currentUser, setCurrentUser] = React.useState({});
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [userEmail, setUserEmail] = React.useState("");
  const history = useHistory();

  React.useEffect(() => {
    Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([userInfo, initialCards]) => {
        setCurrentUser(userInfo);
        setCards(initialCards);
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  }, []);

  function handleDeleteClick(card) {
    setIsRusurePopupOpen(true);
    setDeletedCard(card);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleImageClick(caption, path) {
    setSelectedCard({ name: caption, link: path });
    setIsImagePopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsImagePopupOpen(false);
    setIsRusurePopupOpen(false);
    setIsInfoTooltipOpen(false);
    setSelectedCard({ name: "", link: "" });
  }

  function handleUpdateUser({ name, about }) {
    api
      .setUserInfo(name, about)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  }

  function handleUpdateAvatar({ avatar }) {
    api
      .setAvatar(avatar)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  }

  function handleAddPlace({ name, link }) {
    api
      .addNewCard(name, link)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        const newCards = cards.map((c) => (c._id === card._id ? newCard : c));
        setCards(newCards);
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  }

  function handleDeleteCard() {
    api
      .deleteCard(deletedCard._id)
      .then(() => {
        const newCards = cards.filter((c) => c._id !== deletedCard._id);
        setCards(newCards);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  }

  function handleRegister(email, password) {
    auth
      .register(email, password)
      .then((res) => {
        setIsInfoTooltipOpen(true);
        setIsSuccess(true);
        history.push("/sign-in");
      })
      .catch(() => {
        setIsInfoTooltipOpen(true);
        setIsSuccess(false);
      });
  }

  function handleLogin(email, password) {
    auth.login(email, password).then((res) => {
      if (res.token) {
        localStorage.setItem("token", res.token);
        setLoggedIn(true);
        history.push("/");
      }
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
    });
  }

  const checkToken = React.useCallback(() => {
    const token = localStorage.getItem("token");
    if (token) {
      auth
        .checkToken(token)
        .then((res) => {
          if (res) {
            setLoggedIn(true);
            setUserEmail(res.data.email);
            history.push("/");
          }
        })
        .catch(() => history.push("/sign-in"));
    }
  }, [history]);

  React.useEffect(() => {
    checkToken();
  }, [checkToken, loggedIn]);

  function handleLogout() {
    localStorage.removeItem("token");
    setLoggedIn(false);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header email={userEmail} onLogOut={handleLogout} />
        <Switch>
          <ProtectedRoute
            exact
            path="/"
            loggedIn={loggedIn}
            component={Main}
            onEditProfile={handleEditProfileClick}
            onEditAvatar={handleEditAvatarClick}
            onAddPlace={handleAddPlaceClick}
            onCardClick={handleImageClick}
            cards={cards}
            onCardLike={handleCardLike}
            onCardDelete={handleDeleteClick}
          />
          <Route path="/sign-up">
            <Register onRegister={handleRegister} />
          </Route>
          <Route path="/sign-in">
            <Login onLogin={handleLogin} />
          </Route>
        </Switch>

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlace}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />

        <RusurePopup
          isOpen={isRusurePopupOpen}
          onClose={closeAllPopups}
          onDeleteCard={handleDeleteCard}
        />
        <ImagePopup
          card={selectedCard}
          isOpen={isImagePopupOpen}
          onClose={closeAllPopups}
        />

        <InfoTooltip
          isOpen={isInfoTooltipOpen}
          onClose={closeAllPopups}
          isSuccess={isSuccess}
        />

        <Footer />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;