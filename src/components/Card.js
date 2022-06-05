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
        this._likeElement = this._element.querySelector('.card__like');
        this._likesCounterElement = this._element.querySelector('.card__likes-counter');
        this._removeElement = this._element.querySelector('.card__remove');
        this._picElement = this._element.querySelector('.card__pic');
        this._titleElement = this._element.querySelector('.card__title');

        // обработчик лайка
        this._likeElement.addEventListener('click', () => { this._handleLikeClick(this) });

        // обработчик удаления карточки
        this._removeElement.addEventListener('click', () => { this._handleDeleteClick(this) });

        // обработчик открытия режима "большой картинки"
        this._picElement.addEventListener('click', () => { this._handleCardClick() });
    }

    _getTemplate() {
        // клонируем и возвращаем содержимое тега template
        return document
            .querySelector(this._templateClass)
            .content
            .querySelector('.card')
            .cloneNode(true);
    }

    _isLiked() {
        return Boolean(this._likes.find(item => item._id === this._userId));
    }

    _checkOwner() {
        if (this._ownerId !== this._userId) {
            this._removeElement.remove();
        }
    }

    _activateLike() {
        // установка счетчика лайков
        this._likesCounterElement.textContent = this._likes.length;

        if (this._isLiked()) {
            this._likeElement.classList.add('card__like_active');
        } else {
            this._likeElement.classList.remove('card__like_active');
        }
    }

    updateLikesView(likes) {
        this._likes = likes;
        this._activateLike();
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

    getCard() {
        // получаем элемент карточки из шаблона
        this._element = this._getTemplate();

        // вешаем необходимые слушатели
        this._setEventListeners();

        // проверяем лайки
        this._activateLike();

        // запустим проверку на владельца карточки, для правильного отображения иконки удаления
        this._checkOwner();

        // необходимые элементы клонированного шаблона карточки наполняем данными
        this._picElement.src = this._link;
        this._picElement.alt = this._name;
        this._titleElement.textContent = this._name;

        // вернём элемент карточки наружу
        return this._element;
    }
}
