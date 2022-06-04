export default class Card {
    constructor(data , templateClass, userId, { handleCardClick, handleLikeClick, handleDeleteClick }) {
        this._name = data.name;
        this._link = data.link;
        this._likes = data['likes'];
        this._id = data['_id'];
        this._ownerId = data['owner']['_id'];
        this._userId = userId;
        this._templateClass = templateClass;
        this._handleCardClick = handleCardClick;
        this._handleLikeClick = handleLikeClick;
        this._handleDeleteClick = handleDeleteClick;
    }

    _setEventListeners() {
        // обработчик лайка
        this._element
            .querySelector('.card__like')
            .addEventListener('click', () => { this._handleLikeClick(this) });

        // обработчик удаления карточки
        this._element
            .querySelector('.card__remove')
            .addEventListener('click', () => { this._handleDeleteClick(this) });

        // обработчик открытия режима "большой картинки"
        this._element
            .querySelector('.card__pic')
            .addEventListener('click', () => { this._handleCardClick() });
    }

    _checkLike() {
        this._likes.forEach((like) => {
            if (like._id === this._userId) {
                this._element
                    .querySelector('.card__like')
                    .classList
                    .add('card__like_active');
            } else {
                this._element
                    .querySelector('.card__like')
                    .classList
                    .remove('card__like_active');
            }
        })
    }

    _checkOwner() {
        if (this._ownerId !== this._userId) {
            this._element
                .querySelector('.card__remove')
                .remove();
        }
    }

    activateLike(likes) {
        // активация лайка на карточке
        this._element
            .querySelector('.card__like')
            .classList
            .toggle('card__like_active');

        // установка счетчика лайков
        this._element
            .querySelector('.card__likes-counter')
            .textContent = likes.length;
    }

    getId() {
        return this._id;
    }

    returnDomElement() {
        return this._element;
    }

    deleteCard() {
        // удаление карточки по клику на иконку мусорки
        this._element.remove();

        // нуллим карточку после удаления
        this._element = null;
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

        // проверяем лайки
        this._checkLike();

        // запустим проверку на владельца карточки, для правильного отображения иконки удаления
        this._checkOwner();

        // необходимые элементы клонированного шаблона карточки наполняем данными
        this._element.querySelector('.card__pic').src = this._link;
        this._element.querySelector('.card__pic').alt = this._name;
        this._element.querySelector('.card__title').textContent = this._name;
        this._element.querySelector('.card__likes-counter').textContent = this._likes.length;

        // вернём элемент карточки наружу
        return this._element;
    }
}
