export default class Popup {
    constructor({ popupSelector}) {
        this._popupSelector = popupSelector;
        this._popup = document.querySelector(popupSelector);
        this._saveButton = this._popup.querySelector('.popup__save-btn');
        this._handleEscCloseBind = this._handleEscClose.bind(this);
    }

    _handleEscClose(evt) { // приватный метод закрытия попапа нажатием Esc
        if (evt.key === 'Escape') {
            this.close();
        }
    }

    _handleOverlayClose(evt) { // приватный метод закрытия попапа через оверлэй
        evt.stopPropagation();
        if (evt.target.classList.contains('popup')) {
            this.close();
        }
    }

    open() { // публичный метод открытия попапа
        this._popup.classList.add('popup_visible');

        document.addEventListener('keyup', this._handleEscCloseBind);
    }

    close() { // публичный метод закрытия попапа
        this._popup.classList.remove('popup_visible');

        document.removeEventListener('keyup', this._handleEscCloseBind);
    }

    setEventListeners() { // публичный метод установки и удаления необходимых обработчиков
        this._buttonClose = this._popup.querySelector('.popup__close-btn');

        this._popup.addEventListener('click', evt => this._handleOverlayClose(evt));
        this._buttonClose.addEventListener('click', () => this.close());
    }
}
