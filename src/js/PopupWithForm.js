import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
    constructor({ popupSelector }, { submitCallback }) {
        super({ popupSelector });
        this._submitCallback = submitCallback;
        // находим форму попапа
        this._form = this._popup.querySelector('.popup__form');

    }

    _getInputValues() {
        // создаём массив из коллекции инпутов формы попапа
        this._inputs = this._form.querySelectorAll('.popup__input');
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
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            // данные собранные с инпутов формы
            this.dataFromInputs = this._getInputValues();
            // передаём собранные данные во внешнюю функцию-обработчик, чтобы работать с ними извне
            this._submitCallback(this.dataFromInputs);
        });

        super.setEventListeners();
    }
}
