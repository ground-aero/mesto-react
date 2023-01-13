// import './App.css';
import React, {useState} from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";

function App() {

  return (

      <div className="page__container">

        <Header />

        <Main
        />

        <Footer />

        <PopupWithForm />

          <ImagePopup />

      </div>

  );
}

export default App;

