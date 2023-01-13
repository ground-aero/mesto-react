import React, {useState, useEffect} from 'react';
import avatarPath from '../images/avatar.png'
import api from '../utils/api'
import {logDOM} from "@testing-library/react";

export default function Main(props) {

    const [userAvatar, setUserAvatar] = useState('')
    const [userDescription, setUserDescription ] = useState('')
    const [userName, setUserName] = useState('')

    const [cards, setCards] = useState([])

    useEffect(() => {
        api.getUser()
            .then((userData) => {
                // console.log(data)
                setUserName(userData.name)
                setUserDescription(userData.about)
                setUserAvatar(userData.avatar)
            })
            .catch((err) => {console.log(err)})
    }, [])

    useEffect(() => {
        api.getAllCards()
            .then((cardsData) => {
                console.log(cardsData)
                setCards(cardsData)
            })
            .catch((err) => {console.log(err)})
    }, [])

    console.log(cards)

    return (
        <main className="content">

            <section id="profile" className="profile content__section">

                <span className="profile__avatar-edit-btn" onClick={ props.onEditAvatar }>
                    <img className="profile__avatar" src={ userAvatar } style={{ backgroundImage: `url(${userAvatar})` }} alt="бюст улыбающегося человека в красной шапке"/>
                </span>

                <div className="profile__elements-wrap">
                    <div className="profile__name-wrap">
                        <h1 className="profile__name">{userName}</h1>
                        <button className="btn profile__btn-edit opacity-transition" type="button"
                                onClick={ props.onEditProfile } aria-label="edit"></button>
                    </div>
                    <p className="profile__job">{userDescription}</p>
                </div>
                <button className="btn profile__btn-addplace opacity-transition" type="button"
                        onClick={ props.onAddPlace } aria-label="add"></button>
            </section>

            <section className="elements content__section">
                <ul className="elements__list">

                    {cards.map((card, ind) => (
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

                </ul>
            </section>



        </main>
    )
}