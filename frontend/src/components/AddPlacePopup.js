import PopupWithForm from "./PopupWithForm";
import React from "react";

function AddPlacePopup({ onAddPlace, isOpen, onClose }) {
  const [data, setData] = React.useState({
    name: "",
    link: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setData({
      ...data,
      [name]: value,
    });
  };

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace(data);
    [data.name, data.link] = "";
  }

  return (
    <PopupWithForm
      title="Новое место"
      name="add_card"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        id="place-input"
        className="popup__input-text popup__input-text_type_name"
        name="name"
        required
        minLength="2"
        maxLength="40"
        placeholder="Название"
        value={data.name || ""}
        onChange={handleInputChange}
      />
      <span className="popup__error" id="name-input-error"></span>
      <input
        type="url"
        id="image-input"
        className="popup__input-text popup__input-text_type_job"
        name="link"
        required
        minLength="2"
        placeholder="Ссылка на картинку"
        value={data.link || ""}
        onChange={handleInputChange}
      />
      <span className="popup__error" id="job-input-error"></span>
      <button
        type="submit"
        className="popup__button"
        name="popup__submit-button"
      >
        Добавить
      </button>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
