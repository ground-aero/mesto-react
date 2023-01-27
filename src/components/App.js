// import './App.css';
import React, {useState, useEffect} from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import Card from './Card'
import ImagePopup from "./ImagePopup";
import api from '../utils/api'
// import {CurrentUserContext} from '../contexts/CurrentUserContext';
// import {Routes, Route} from 'react-router-dom';

function App() {

    function handleEditAvatarClick() {
        // return document.querySelector('#overlay_avatar').classList.add('popup_opened')
        setIsEditAvatarPopupOpen(true)
    }
    function handleEditProfileClick() {
        // return document.querySelector('#overlay_edit').classList.add('popup_opened')
        setIsEditProfilePopupOpen(true)
    }
    function handleAddPlaceClick() {
        // return document.querySelector('#overlay_add-place').classList.add('popup_opened')
        setIsAddPlacePopupOpen(true)
    }

    function handleImageClick() {
        setIsImagePopupOpen(true)
    }

    function closeAllPopups() {
        setIsEditAvatarPopupOpen(false)
        setIsEditProfilePopupOpen(false)
        setIsAddPlacePopupOpen(false)
        setSelectedCard({})
    }

    function handleCardClick(card) {
        setSelectedCard(card)
        // setIsImagePopupOpen(true)
    }

    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false)
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false)
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false)

    const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false)
    const [selectedCard, setSelectedCard] = React.useState({} )//Показывайте полноразмерную картинку при клике
    // console.log(selectedCard)

    const [currentUser, setCurrentUser] = React.useState()

    useEffect(() => {
        api.getUser()
            .then((userData) => {
                console.log(userData)
                setCurrentUser(userData.about)
                setCurrentUser(userData.avatar)
                setCurrentUser(userData.name)
                setCurrentUser(userData._id)
            })
            .catch((err) => {console.log(`Ошибка данных при загрузке Пользователя: ${err}`)})
    }, [])

    return (

        <div className="page__container">
            <CurrentUserContext.Provider value=''>
                <Header />
                <Main
                    onEditAvatar={ handleEditAvatarClick }
                    onEditProfile={ handleEditProfileClick }
                    onAddPlace={ handleAddPlaceClick }

                    onCardClick={ handleCardClick }
                />
                <Footer />

                <PopupWithForm
                    isOpen={ isEditAvatarPopupOpen }
                    onClose={closeAllPopups}
                    title={"Заменить аватар"}
                    name={"edit-avatar"}
                    textButton={"Сохранить"}
                >
                    <span className="popup__input-field popup__input-field_wrap">
                        <input type="url" className="popup__input" id="avatar-input" name="linkavatar"
                                       placeholder="Ссылка на картинку" required/>
                        <span className="popup__input-span avatar-input-error"
                                      id="input-edit-avatar-error"></span>
                    </span>
                </PopupWithForm>

                <PopupWithForm
                    isOpen={ isEditProfilePopupOpen }
                    onClose={closeAllPopups}
                    title={"Редактировать профиль"}
                    name={"profile"}
                    textButton={"Сохранить"}
                >
                    <span className="popup__input-field popup__input-field_wrap">
                        <input type="text" className="popup__input" id="name-input" name="name"
                               placeholder="Ваше имя"
                               minLength="2" maxLength="40" required/>
                         <span className="popup__input-span name-input-error"
                               id="input-edit-error"></span>
                    </span>
                    <span className="popup__input-field popup__input-field_wrap">
                        <input type="text" className="popup__input" id="job-input" name="about" placeholder="О себе"
                               tabIndex="2" minLength="2" maxLength="200" required/>
                         <span className="popup__input-span job-input-error"
                               id="input-edit_minimum-error"></span>
                    </span>
                </PopupWithForm>

                <PopupWithForm
                    isOpen={ isAddPlacePopupOpen }
                    onClose={closeAllPopups}
                    title={"Новое место"}
                    name={"place"}
                    textButton={"Создать"}
                >
                    <span className="popup__input-field popup__input-field_wrap">
                                             <input type="text" className="popup__input" id="place-input" name="name"
                                                    placeholder="Название"
                                                    tabIndex="1" minLength="2" maxLength="30" required/>
                                             <span className="popup__input-span place-input-error"
                                                   id="input-addplace-error"></span>
                                         </span>
                    <span className="popup__input-field popup__input-field_wrap">
                                             <input type="url" className="popup__input" id="link-input" name="link"
                                                    placeholder="Ссылка на картинку" tabIndex="2" required/>
                                             <span className="popup__input-span link-input-error"
                                                   id="input-addplace_url-error"></span>
                                         </span>
                </PopupWithForm>

                <ImagePopup
                    onImageClick={ handleImageClick }
                    card={ selectedCard }
                    onClose={ closeAllPopups }
                    name={"zoom"}
                />

            </CurrentUserContext.Provider>
        </div>

  );
}

export default App;
