// import './App.css';
import React, {useState} from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from "./ImagePopup";

function App() {

  return (

      <div className="page__container">

        <Header />

        <Main
        />

        <Footer />

        <PopupWithForm
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

