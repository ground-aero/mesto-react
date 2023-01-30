// import './App.css';
import React, {useEffect} from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import Card from './Card'
import ImagePopup from "./ImagePopup";
import api from '../utils/api'
import CurrentUserContext from '../contexts/CurrentUserContext';
// import {Routes, Route} from 'react-router-dom';

/**
 * @returns {JSX.Element}
 * @constructor
 */
function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);

  const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false);

  /** Состояние выбранной для просмотра карточки */
  const [selectedCard, setSelectedCard] = React.useState({});

  /** Состояние текущего пользователя */
  const [currentUser, setCurrentUser] = React.useState({
    name: '',
    about: '',
  });

  /** Состояние массива карточек */
  const [isCards, setCards] = React.useState([]);
  // console.log(isCards);


  /** Открывает всплывающее редактирование аватара */
  function handleEditAvatarClick() {
    // return document.querySelector('#overlay_avatar').classList.add('popup_opened')
    setIsEditAvatarPopupOpen(true);
  }
  /** Открывает всплывающее редактирование профиля */
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  /** Открывает всплывающее добавление карточки */
  function handleAddPlaceClick() {
    // return document.querySelector('#overlay_add-place').classList.add('popup_opened')
    setIsAddPlacePopupOpen(true);
  }

  function handleImageClick() {
    setIsImagePopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard({});
  }

  /** Устанавливает выбранную карточку по нажатию
   * @param card */
  function handleCardClick(card) {
    setSelectedCard(card);
    // setIsImagePopupOpen(true)
  }

  function handleCardLike(card) {
    // ставит/удаляет лайки, @param card - объект карточки
    const isLiked = card.likes.some((i) => i._id === currentUser._id); // Снова проверяем, есть ли уже лайк на этой карточке
    api
      .changeLikeCardStatus(card._id, isLiked) // Отправляем запрос в API и получаем обновлённые данные карточки
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      });
  }

  // useEffect(() => {
  //   api
  //     .getUser()
  //     .then((userData) => {
  //       // console.log(userData)
  //       setCurrentUser(userData);
  //     })
  //     .catch((err) => {
  //       console.log(`Ошибка данных при загрузке Пользователя: ${err}`);
  //     });
  // }, []);
  //
  // useEffect(() => {
  //   api
  //     .getAllCards()
  //     .then((cardsData) => {
  //       // console.log(cardsData)
  //       setCards(cardsData);
  //     })
  //     .catch((err) => {
  //       console.log(`Ошибка данных при загрузке карточек: ${err}`);
  //     });
  // }, []);

  useEffect(() => {
    Promise.all([api.getUser(), api.getAllCards()])
        .then(([userData, cardsData]) => {

          setCurrentUser(userData);

          setCards(cardsData);
    })
        .catch((err) => {
          console.log(`Ошибка данных при загрузке аватара или карточек: ${err}`);
        });
  }, [])

  return (
    <div className="page__container">
      <CurrentUserContext.Provider value={currentUser}>
        <Header />
        <Main
          onEditAvatar={handleEditAvatarClick}
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}

          isCards={isCards}
          onCardClick={handleCardClick}
          onCardLike={handleCardLike} //лайк/дизлайк
        />
        <Footer />

        <PopupWithForm
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          title={'Заменить аватар'}
          name={'edit-avatar'}
          textButton={'Сохранить'}
        >
          <span className="popup__input-field popup__input-field_wrap">
            <input
              type="url"
              className="popup__input"
              id="avatar-input"
              name="linkavatar"
              placeholder="Ссылка на картинку"
              required
            />
            <span
              className="popup__input-span avatar-input-error"
              id="input-edit-avatar-error"
            ></span>
          </span>
        </PopupWithForm>

        <PopupWithForm
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          title={'Редактировать профиль'}
          name={'profile'}
          textButton={'Сохранить'}
        >
          <span className="popup__input-field popup__input-field_wrap">
            <input
              type="text"
              className="popup__input"
              id="name-input"
              name="name"
              placeholder="Ваше имя"
              minLength="2"
              maxLength="40"
              required
            />
            <span
              className="popup__input-span name-input-error"
              id="input-edit-error"
            ></span>
          </span>
          <span className="popup__input-field popup__input-field_wrap">
            <input
              type="text"
              className="popup__input"
              id="job-input"
              name="about"
              placeholder="О себе"
              tabIndex="2"
              minLength="2"
              maxLength="200"
              required
            />
            <span
              className="popup__input-span job-input-error"
              id="input-edit_minimum-error"
            ></span>
          </span>
        </PopupWithForm>

        <PopupWithForm
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          title={'Новое место'}
          name={'place'}
          textButton={'Создать'}
        >
          <span className="popup__input-field popup__input-field_wrap">
            <input
              type="text"
              className="popup__input"
              id="place-input"
              name="name"
              placeholder="Название"
              tabIndex="1"
              minLength="2"
              maxLength="30"
              required
            />
            <span
              className="popup__input-span place-input-error"
              id="input-addplace-error"
            ></span>
          </span>
          <span className="popup__input-field popup__input-field_wrap">
            <input
              type="url"
              className="popup__input"
              id="link-input"
              name="link"
              placeholder="Ссылка на картинку"
              tabIndex="2"
              required
            />
            <span
              className="popup__input-span link-input-error"
              id="input-addplace_url-error"
            ></span>
          </span>
        </PopupWithForm>

        <ImagePopup
          onImageClick={handleImageClick}
          card={selectedCard}
          onClose={closeAllPopups}
          name={'zoom'}
        />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
