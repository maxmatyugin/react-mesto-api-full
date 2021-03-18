function ImagePopup({ isOpen, card, onClose }) {
  return (
    <div className={`popup popup_type_image ${isOpen && "popup_opened"}`}>
      <div className="popup__figure">
        <img
          className="popup__image"
          alt={`Изображение ${card.name}`}
          src={card.link}
        />
        <h2 className="popup__caption">{card.name}</h2>
        <button
          type="button"
          aria-label="Закрыть"
          className="popup__close-icon popup__close-icon_position_corner"
          name="popup__close-button"
          onClick={onClose}
        ></button>
      </div>
    </div>
  );
}

export default ImagePopup;
