import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
    constructor({ popupSelector }) {
        super({ popupSelector }); // наследуем от родительского класса
        this._picElement = this._popup.querySelector('.popup__img');
        this._picTitle = this._popup.querySelector('.popup__name');
    }

    open(pictureData) { // Сделали перегрузку метода - расширили функциональность метода родительского класса
        this._picElement.src = pictureData.link;
        this._picElement.alt = pictureData.name;
        this._picTitle.textContent = pictureData.name;

        super.open(); // вызываем родительский метод
    }
}
