import React, {useEffect, useState} from 'react'
import api from "../utils/api";

function Card (props) {
    const [isCards, setCards] = useState([])

    useEffect(() => {
        api.getAllCards()
            .then((cardsData) => {
                console.log(cardsData)
                setCards(cardsData)
            })
            .catch((err) => {console.log(err)})
    }, [])
    // console.log(isCards)

        return (
            <>
            {isCards.map((card, ind) => (
                    <li key={ind} className="card">
                        <button className="card__btn-del opacity-transition" type="button" aria-label="delete"></button>
                        <img className="card__img" alt="#" src={card.link} style={{ backgroundImage: `url(${card.link})` }}/>
                        <div className="card__info-wrap">
                            <h2 className="card__title">{card.name}</h2>
                            <div className="card__btn-like-wrap">
                                <button className="card__btn-like opacity-transition" type="button"
                                        aria-label="like"></button>
                                <span className="card__btn-like-count">{card.likes.length}</span>
                            </div>
                        </div>
                    </li>
                ))}
            </>

    )
}

export default Card