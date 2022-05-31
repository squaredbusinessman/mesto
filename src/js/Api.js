export default class Api {
    constructor(config) {
        this._profileUrl = config.userUrl;
        this._cardsUrl = config.cardsUrl;
        this._headers = config.headers;
        this._handleResponse = (response) => {
            if (response.ok) {
                return response.json();
            } else {
                return Promise.reject(`Произошла ошибка при обработке данных ${response.status}`);
            }
        }
    }

    getCards = () => {
        return fetch(this._cardsUrl, {
            method: 'GET',
            headers: this._headers
        })
            .then(this._handleResponse);
    }

    addCard = (data) => {
        return fetch(this._cardsUrl, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify(data)
        })
            .then(this._handleResponse)
    }

    deleteCard = (id) => {
        return fetch(`${this._cardsUrl}/${id}`, {
            method: 'DELETE',
            headers: this._headers,
        })
            .then(this._handleResponse);
    }

    getProfile = () => {
        return fetch(this._profileUrl, {
            method: 'GET',
            headers: this._headers
        })
            .then(this._handleResponse);
    }

    updateProfile = (data) => {
        return fetch(this._profileUrl, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify(data)
        })
            .then(this._handleResponse)

    }

    updateAvatar = (data) => {}

    cardLike = () => {}

    cardDislike = () => {}

    getAllData = () => {
        return Promise.all([this.getProfile(this._profileUrl), this.getCards(this._cardsUrl)]);
    }
}
