function PopupWithForm({
  name,
  isOpen,
  onSubmit,
  title,
  children,
  onClose,
}) {
  return (
    
    <div className={`popup popup_type_${name} ${isOpen && "popup_opened"}`}>
      <form
        className={`popup__container popup__container_type_${name}`}
        name="popup__form"
        onSubmit={onSubmit}
      >
        
        <h2 className="popup__header">{title}</h2>
        {children}

        <button
          type="reset"
          aria-label="Закрыть"
          className="popup__close-icon"
          name="popup__reset-button"
          onClick={onClose}
        ></button>
      </form>
    </div>
  );
}

export default PopupWithForm;
