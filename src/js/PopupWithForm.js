import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
    constructor(popupSelector, { submitCallback }) {
        super(popupSelector);
        this._submitCallback = submitCallback;
        this._form = this._popup.querySelector('.popup__form'); // находим форму попапа
        this._inputs = this._form.querySelectorAll('.popup__input'); // создаём массив из коллекции инпутов формы попапа
        this._submitButton = this._form.querySelector('.popup__save-btn');
    }

    _getInputValues() {
        // объект для данных из инпутов
        const inputsData = {};
        // Запись данных с инпутов в объект
        this._inputs.forEach(input => inputsData[input.name] = input.value);
        return inputsData;
    }

    close() {
        super.close(); // вызываем родительский метод
        this._form.reset(); // Перегружаем метод, добавляя вызов сброса формы
    }

    setEventListeners() {
        super.setEventListeners();
        this._submitButton.addEventListener('submit', evt => this._submitCallback(evt));
    }
}
