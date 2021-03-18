import PopupWithForm from "./PopupWithForm";
import React from "react";

function RusurePopup({ onDeleteCard, isOpen, onClose }) {
  function handleSubmit(e) {
    e.preventDefault();
    onDeleteCard();
  }

  return (
    <PopupWithForm
      title="Вы уверены?"
      name="rusure"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <button
        type="submit"
        className="popup__button"
        name="popup__submit-button"
      >
        Удалить
      </button>
    </PopupWithForm>
  );
}

export default RusurePopup;
