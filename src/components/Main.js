import React, {useState, useEffect} from 'react';
import api from '../utils/api'
import {logDOM} from "@testing-library/react";
import Card from "./Card";
import CurrentUserContext from "../contexts/CurrentUserContext";

function Main({ onEditAvatar, onEditProfile, onAddPlace, onCardClick, children }) {

    const currentUser = React.useContext(CurrentUserContext);
    // console.log(currentUser)
    // const [userAvatar, setUserAvatar] = useState('')
    // const [userDescription, setUserDescription ] = useState('')
    // const [userName, setUserName] = useState('')

    const [isCards, setCards] = useState([])

    useEffect(() => {
        api.getAllCards()
            .then((cardsData) => {
                // console.log(cardsData)
                setCards(cardsData)
            })
            .catch((err) => {console.log(err)})
    }, [])

    // useEffect(() => {
    //     api.getUser()
    //         .then((userData) => {
    //             // console.log(data)
    //             setUserName(userData.name)
    //             setUserDescription(userData.about)
    //             setUserAvatar(userData.avatar)
    //         })
    //         .catch((err) => {console.log(`Ошибка запроса загрузки данных пользователя ${err}`)})
    // }, [])

    return (
      <main className="content">
        <section id="profile" className="profile content__section">
          <span className="profile__avatar-edit-btn" onClick={onEditAvatar}>
            <img
              className="profile__avatar"
              src={ currentUser.avatar }
              alt="бюст улыбающегося человека в красной шапке"
            />
          </span>

          <div className="profile__elements-wrap">
            <div className="profile__name-wrap">
              <h1 className="profile__name">{ currentUser.name }</h1>
              <button
                className="btn profile__btn-edit opacity-transition"
                type="button"
                onClick={onEditProfile}
                aria-label="edit"
              ></button>
            </div>
            <p className="profile__job">{ currentUser.about }</p>
          </div>
          <button
            className="btn profile__btn-addplace opacity-transition"
            type="button"
            onClick={onAddPlace}
            aria-label="add"
          ></button>
        </section>

        <section className="elements content__section">
          <ul className="elements__list">
            {isCards.map((card, ind) => {
              return (
                <Card card={card} key={card._id} onCardClick={onCardClick} />
              );
            })}
          </ul>
        </section>
      </main>
    );
}

export default Main