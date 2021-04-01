import { CurrentUserContext } from "../contexts/CurrentUserContext";
import React from "react";

function Card({ onCardClick, card, onCardLike, onCardDelete }) {
  function handleCardClick() {
    onCardClick(card.name, card.link);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }

  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = card.owner === currentUser._id;
  const cardDeleteButtonClassName = `element__delete-button ${
    isOwn ? "" : "element__delete-button_hidden"
  }`;
  const isLiked = card.likes.some(i => i === currentUser._id);
  const cardLikeButtonClassName = `element__like-button ${
    isLiked ? "element__like-button_active" : ""
  } `;

  return (
    <li className="element">
      <div className="element__image-container">
        <img
          className="element__image"
          src={card.link}
          alt={`Изображение, на котором ${card.name}`}
          onClick={handleCardClick}
        />
        <button
          className={cardDeleteButtonClassName}
          onClick={handleDeleteClick}
        ></button>
      </div>
      <div className="element__caption">
        <h2 className="element__heading">{card.name}</h2>
        <div className="element__like-wrapper">
          <button
            className={cardLikeButtonClassName}
            onClick={handleLikeClick}
          ></button>
          <h3 className="element__like-counter">{card.likes.length}</h3>
        </div>
      </div>
    </li>
  );
}

export default Card;
