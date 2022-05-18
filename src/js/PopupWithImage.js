import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector); // наследуем от родительского класса
        this._picElement = this._popup.querySelector('.popup__img');
        this._picTitle = this._popup.querySelector('.popup__name');
    }

    open(evt) { // Сделали перегрузку метода - расширили функциональность метода родительского класса
        this._picElement.src = evt.target.src;
        this._picElement.alt = evt.target.alt;
        this._picTitle.textContent = evt.target.alt;

        super.open(); // вызываем родительский метод
    }
}
