import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
    constructor(popupSelector, { submitCallback }) {
        super(popupSelector);
        this._submitCallback = submitCallback;
        this._form = this._popup.querySelector('.popup__form'); // находим форму попапа
        this._inputs = Array.from(this._form.elements); // создаём массив из коллекции инпутов формы попапа
        this.inputsData = this._getInputValues();
        this._submitButton = this._form.querySelector('.popup__save-btn');
    }

    _getInputValues() {
        const inputsData = {}; // объект для данных из инпутов
        this._inputs.forEach(
            input => inputsData[input.name] = input.value // Запись данных с инпутов в объект
        );
        return inputsData;
    }

    close() {
        super.close(); // вызываем родительский метод
        this._form.reset(); // Перегружаем метод, добавляя вызов сброса формы
    }

    setEventListeners() {
        super.setEventListeners();
        this._submitButton.addEventListener('click', evt => this._submitCallback(evt));
    }
}
