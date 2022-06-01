import Popup from './Popup.js';

export default class PopupWithSubmit extends Popup {
    constructor({ popupSelector, submitHandler }) {
        super({ popupSelector });
        this._submitHandler = submitHandler;
        this._form = this._popup.querySelector('.popup__form');
    }

    open(data) {
        this._data = data;
        super.open();
    }

    setEventListeners() {
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();

            this._submitHandler(this._data);
        });

        super.setEventListeners();
    }
}
