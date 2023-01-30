//класс не связан с пользовательским интерфейсом, а полностью занят отправкой запросов на сервер и получением от них ответа.

/** @param apiConfig - опции для работы с API (serverURL - url сервера, headers - заголовки в виде объекта) */
export class Api {
    constructor(apiConfig) {
        this._apiConfig = apiConfig;
    }


    _onResponse(res) {
        if (res.ok) {
            return res.json();//Promise.resolve()
         } else {
            return Promise.reject(`Ошибка ${res.status} ${res.statusText}`)
         }
    }

    getAllInfo() {//метод ожидает массив промисов - Promise1, Promise2 ...
        return Promise.all([this.getUser(), this.getAllCards()])//вернет Promise
    }

    // - получить данные пользователя (GET)
    getUser() {
        return fetch(`${this._apiConfig.baseUrl}/users/me`, {
            method: 'GET',
            headers: this._apiConfig.headers
        })
            .then(res => this._onResponse(res))
    }
    // изменить данные пользователя (PATCH)
    patchUser(formValue) {
        // console.log(formValue)
        return fetch(`${this._apiConfig.baseUrl}/users/me`, {
            method: 'PATCH',
            headers: this._apiConfig.headers,
            body: JSON.stringify({
                name: formValue.name,
                about: formValue.about,
            })
        })
            .then(res => this._onResponse(res))
    }

    // - заменить аватар (PATCH)
    patchAvatar(formDataObject) {
        return fetch(`${this._apiConfig.baseUrl}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._apiConfig.headers,
            body: JSON.stringify(formDataObject)// avatar: formValue.avatar,
        })
            .then(res => this._onResponse(res))
    }

    getAllCards() {
        return fetch(`${this._apiConfig.baseUrl}/cards/`, {
            method: 'GET',
            headers: this._apiConfig.headers,
        })
            .then(res => this._onResponse(res))
    }

    addNewCard({ name, link }) {
        return fetch(`${this._apiConfig.baseUrl}/cards/`, {
            method: 'POST',
            headers: this._apiConfig.headers,
            body: JSON.stringify({ name, link }),
        })
            .then(res => this._onResponse(res))
    }

    deleteCard(cardId) {
        // console.log(`${this._apiConfig.baseUrl}/cards/${id}`)
        return fetch(`${this._apiConfig.baseUrl}/cards/${cardId}`, {
            method: 'DELETE',
            headers: this._apiConfig.headers
        })
            .then(res => this._onResponse(res))
    }

//     // - “залайкать” карточку (PUT)
//     putLike(id) {//нужно работать с id !!!!!!!!!!!!!!! По сути  тоже что и удаление !!! чуть иначе используется
//         return fetch(`${this._apiConfig.baseUrl}/cards/likes/${id}`, {
//             method: 'PUT',
//             headers: this._apiConfig.headers,
//             body: JSON.stringify({ id }),
//         })
//             .then(res => this._onResponse(res))
//     }
//
//     // - удалить лайк карточки (DELETE)
//     deleteLike(id) {//нужно работать с id !!!!!!!!!!!!!!! По сути  тоже что и удаление !!! чуть иначе используется
//         return fetch(`${this._apiConfig.baseUrl}/cards/likes/${id}`, {
//             method: 'DELETE',
//             headers: this._apiConfig.headers
//         })
//             .then(res => this._onResponse(res))
//     }

/** ставит/удаляет лайк
/* @param cardLiked - boolean, если лайк есть, удаление, нет - установка
/* @param cardID - ID карточки
/* @returns {Promise<Response>} - объект карточки / текст ошибки */
    changeLikeCardStatus(cardId, isLiked) {
console.log(isLiked)
        return fetch(`${this._apiConfig.baseUrl}/cards/likes/${cardId}`, {
            method: isLiked?"DELETE":"PUT",
            headers: this._apiConfig.headers

        })
            .then(res => this._onResponse(res))
    }


}



export const apiConfig = {
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-51',
    headers: {
        "content-type": "application/json",
        "Authorization": "428b584a-5472-4fac-aca2-5c3d80bec64e"
    }
}

const api = new Api(apiConfig)
export default api