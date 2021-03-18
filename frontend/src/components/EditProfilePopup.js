import PopupWithForm from "./PopupWithForm";
import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup({ onUpdateUser, isOpen, onClose }) {
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const currentUser = React.useContext(CurrentUserContext);

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]);

  function handleInputChange(e) {
    e.target.name === "popup__name"
      ? setName(e.target.value)
      : setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      name: name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      title="Редактировать профиль"
      name="profile"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        id="name-input"
        className="popup__input-text popup__input-text_type_name"
        name="popup__name"
        required
        minLength="2"
        maxLength="40"
        placeholder="Ваше имя"
        value={name || ''}
        onChange={handleInputChange}
      />
      <span className="popup__error" id="name-input-error"></span>
      <input
        type="text"
        id="job-input"
        className="popup__input-text popup__input-text_type_job"
        name="popup__job"
        required
        minLength="2"
        maxLength="200"
        placeholder="Род деятельности"
        value={description || ''}
        onChange={handleInputChange}
      />
      <span className="popup__error" id="job-input-error"></span>
      <button
          type="submit"
          className="popup__button"
          name="popup__submit-button"
        >
          Сохранить
        </button>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
