import PopupWithForm from "./PopupWithForm";
import React from "react";

function EditAvatarPopup({ onUpdateAvatar, isOpen, onClose }) {
  const avatarRef = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  return (
    <PopupWithForm
      title="Обновить аватар"
      name="avatar"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        id="avatar-input"
        className="popup__input-text popup__input-text_type_avatar"
        name="popup__name"
        required
        minLength="2"
        placeholder="Ссылка на картинку"
        ref={avatarRef}
      />
      <span className="popup__error" id="name-input-error"></span>
      <button
          type="submit"
          className="popup__button"
          name="popup__submit-button"
        >
          Обновить
        </button>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
