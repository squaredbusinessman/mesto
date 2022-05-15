export default class Card {
    constructor(data, templateClass, { handleCardClick }) {
        this._name = data.name;
        this._link = data.link;
        this._templateClass = templateClass;
        this._handleCardClick = handleCardClick;
    }

    _setEventListeners() {
        // обработчик лайка
        this._element
            .querySelector('.card__like')
            .addEventListener('click', () => this._handleLikeClick());
        // обработчик удаления карточки
        this._element
            .querySelector('.card__remove')
            .addEventListener('click', () => this._handleRemoveButtonClick());
        // обработчик открытия режима "большой картинки"
        this._element
            .querySelector('.card__pic')
            .addEventListener('click', this._handleCardClick);
    }

    _handleLikeClick() {
        // активация лайка на карточке
        this._element
            .querySelector('.card__like')
            .classList
            .toggle('card__like_active');
    }

    _handleRemoveButtonClick() {
        // удаление карточки по клику на иконку мусорки
        this._element
            .closest('.card')
            .remove();
    }

    _getTemplate() {
        // клонируем и возвращаем содержимое тега template
        return document
            .querySelector(this._templateClass)
            .content
            .querySelector('.card')
            .cloneNode(true);
    }

    getCard() {
        // получаем элемент карточки из шаблона
        this._element = this._getTemplate();
        // вешаем необходимые слушатели
        this._setEventListeners();
        // необходимые элементы клонированного шаблона карточки наполняем данными
        this._element.querySelector('.card__pic').src = this._link;
        this._element.querySelector('.card__pic').alt = this._name;
        this._element.querySelector('.card__title').textContent = this._name;
        // вернём элемент карточки наружу
        return this._element;
    }
}
