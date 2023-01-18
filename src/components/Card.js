import React, {useEffect, useState} from 'react'
import api from "../utils/api";

function Card ({card, onCardClick}) {
    // console.log(card)

    function handleClick() {
        onCardClick(card);
    }

    return (
            <li className="card">
                    <button className="card__btn-del opacity-transition" type="button" aria-label="delete"></button>
                    <img className="card__img" src={ card.link} alt={ card.name } onClick={handleClick} />
                    <div className="card__info-wrap">
                        <h2 className="card__title">{ card.name}</h2>
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