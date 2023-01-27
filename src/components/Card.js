import React, {useEffect, useState} from 'react'
import api from "../utils/api";
import CurrentUserContext from "../contexts/CurrentUserContext";

function Card ({ card, onCardClick }) {
    console.log(card)
    const currentUser = React.useContext(CurrentUserContext)
      console.log(currentUser)
    // Определяем, являемся ли мы владельцем текущей карточки
    const isOwn = card.owner._id === currentUser._id;



    function handleClick() {
        onCardClick(card);
    }

    return (
            <li className="card">
                {isOwn && <button className="card__btn-del onClick={handleDeleteClick} opacity-transition" type="button" aria-label="delete" />}
                    <img className="card__img" src={ card.link } alt={ card.name } onClick={handleClick} />
                    <div className="card__info-wrap">
                        <h2 className="card__title">{ card.name }</h2>
                        <div className="card__btn-like-wrap">
                            <button className="card__btn-like opacity-transition" type="button"
                                    aria-label="like"></button>
                            <span className="card__btn-like-count">{ card.likes.length}</span>
                        </div>
                    </div>
            </li>

    )
}

export default Card