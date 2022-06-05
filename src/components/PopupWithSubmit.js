import Popup from './Popup.js';

export default class PopupWithSubmit extends Popup {
    constructor({ popupSelector, buttonTextsObj }) {
        super({ popupSelector, buttonTextsObj });
        this._form = this._popup.querySelector('.popup__form');
    }

    setSubmitHandler({ submitHandler }) {
        this._submitHandler = submitHandler;
    }

    setEventListeners() {
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();

            this._submitHandler();
        });

        super.setEventListeners();
    }
}
