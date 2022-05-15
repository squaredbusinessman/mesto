export default class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector);
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
        this.setEventListeners();
    }

    close() { // публичный метод закрытия попапа
        this._popup.classList.remove('popup_visible');
        this.setEventListeners();
    }

    setEventListeners() { // публичный метод установки и удаления необходимых обработчиков
        if (this._popup.classList.contains('popup_visible')) {
            this._popup.addEventListener('click', evt => this._handleOverlayClose(evt));
            document.addEventListener('keyup', evt => this._handleEscClose(evt));
        } else {
            this._popup.removeEventListener('click', evt => this._handleOverlayClose(evt));
            document.removeEventListener('keyup', evt => this._handleEscClose(evt));
        }
    }
}
