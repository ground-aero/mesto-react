import React from 'react';

function ImagePopup() {

    return (

        <>
            <div className="popup popup_img-bg" id="overlay_img-zoom">
                <div className="popup__container-img popup__container-img_type_zoomer">
                    <button
                        className="popup__close-img popup__btn-close opacity-transition opacity-transition_type_middle"
                        type="button"></button>
                    <img className="popup__img" src="src/components/App" alt="#"/>
                    <h3 className="popup__subtitle"></h3>
                </div>
            </div>
        </>
    )
}

export default ImagePopup