// import './App.css';
import React, {useState} from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from "./ImagePopup";

function App() {

    function handleEditAvatarClick() {
        // return document.querySelector('#overlay_avatar').classList.add('popup_opened')
        setEditAvatarPopupOpen(true)
    }
    function handleEditProfileClick() {
        // return document.querySelector('#overlay_edit').classList.add('popup_opened')
        setEditProfilePopupOpen(true)
    }
    function handleAddPlaceClick() {
        // return document.querySelector('#overlay_add-place').classList.add('popup_opened')
        setAddPlacePopupOpen(true)
    }

    function closeAllPopups() {
        setEditAvatarPopupOpen(false)
        setEditProfilePopupOpen(false)
        setAddPlacePopupOpen(false)
    }

    const [state, setState] = useState(0);
// console.log(state)
// console.log(setState)
    const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false)
    const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false)
    const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false)


    return (

        <div className="page__container">

            <Header />

            <Main
                onEditAvatar={ handleEditAvatarClick }
                onEditProfile={ handleEditProfileClick }
                onAddPlace={ handleAddPlaceClick }
                />

            <Footer />

            <PopupWithForm
                isOpen={isEditAvatarPopupOpen}
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
                isOpen={isEditProfilePopupOpen}
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
                isOpen={isAddPlacePopupOpen}
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



            <ImagePopup/>

        </div>

  );
}

export default App;
