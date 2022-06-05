import Popup from './Popup.js';

export default class PopupWithSubmit extends Popup {
    constructor({ popupSelector, buttonTextsObj }) {
        super({ popupSelector });
        this._form = this._popup.querySelector('.popup__form');
        this._buttonTexts = buttonTextsObj;
    }

    setSubmitHandler({ submitHandler }) {
        this._submitHandler = submitHandler;
    }

    renderLoading (isLoading) {
        if (isLoading) {
            this._saveButton.textContent = this._buttonTexts.loadingText;
        } else {
            this._saveButton.textContent = this._buttonTexts[this._popupSelector];
        }
    }

    setEventListeners() {
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();

            this._submitHandler();
        });

        super.setEventListeners();
    }
}
