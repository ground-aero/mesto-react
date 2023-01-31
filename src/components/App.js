// import './App.css';
import React, {useEffect} from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import Card from './Card';
import ImagePopup from "./ImagePopup";
import api from '../utils/api';
import CurrentUserContext from '../contexts/CurrentUserContext';
import EditProfilePopup from '../components/EditProfilePopup';
import EditAvatarPopup from "./EditAvatarPopup";

// import {Routes, Route} from 'react-router-dom';

/**
 * @returns {JSX.Element}
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

  /** Состояние выбранной для удаления карточки */
  const [deleteCard, setDeleteCard] = React.useState({_id: ""});


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

  /** ставит/удаляет лайки, @param card - объект карточки */
  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id); // Снова проверяем, есть ли уже лайк на этой карточке
    api
      .changeLikeCardStatus(card._id, isLiked) // Отправляем запрос в API и получаем обновлённые данные карточки
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      });
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id)
        .then(() => {
          /** создать копию массива, исключив из него удалённую карточку. */
          setCards((isCards) => isCards.filter(del => del !== card))
        })
        .catch((err) => {
          console.log(`Ошибка данных при удалении карточки: ${err}`);
        });
  }

  function handleUpdateUser(name, about) {
    api.patchUser(name, about)
        .then((userData) => {
            console.log(userData)
          setCurrentUser(userData)
          closeAllPopups()
        })
        .catch((err) => {
          console.log(`Ошибка при загрузке данных юзера: ${err}`);
        });
  }

  function handleUpdateAvatar(link) {
    api.patchAvatar(link)
        .then((result) => {
          console.log(result)
          setCurrentUser(result)
          closeAllPopups()
        })
        .catch((err) => {
          console.log(`Ошибка при загрузке данных аватара: ${err}`);
        });
  }

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
          onCardDelete={handleCardDelete}
        />
        <Footer />


        <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
        />


        <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
        />


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
