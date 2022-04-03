// Константы
const ESC_KEY = 'Escape';

// Используемые в проекте попапы
const profileEditPopup = document.querySelector('.popup_id_profile-edit');
const addNewPostPopup = document.querySelector('.popup_id_new-post');
const bigPicturePopup = document.querySelector('.popup_id_big-picture');

// Необходимые элементы формы popup
const formElements = document.querySelectorAll('.popup__form');

const editFormElement = profileEditPopup.querySelector('.popup__form');
const nameInputElement = editFormElement.querySelector('.popup__input_type_name');
const aboutInputElement = editFormElement.querySelector('.popup__input_type_about');
const editPopupCloseButton = profileEditPopup.querySelector('.popup__close-btn');

const postFormElement = addNewPostPopup.querySelector('.popup__form');
const picNameElement = postFormElement.querySelector('.popup__input_type_name');
const picSrcElement = postFormElement.querySelector('.popup__input_type_about');
const postPopupCloseButton = addNewPostPopup.querySelector('.popup__close-btn');

const bigPicElement = bigPicturePopup.querySelector('.popup__img');
const bigPicNameElement = bigPicturePopup.querySelector('.popup__name');

// Необходимые элементы блока user
const userSectionElement = document.querySelector('.user');
const userNameElement = userSectionElement.querySelector('.user__name');
const userAboutElement = userSectionElement.querySelector('.user__about');
const nickEditButton = userSectionElement.querySelector('.user__nick-editor-btn');
const addNewPostButton = userSectionElement.querySelector('.user__add-post-btn');

// Необходимые элементы карточек
const cardsContainer = document.querySelector('.cards');
const cardTemplate = document.querySelector('#card-template').content;

// Функция удаления карточек
function deleteAllCards() {
    const cards = cardsContainer.querySelectorAll('.card');
    cards.forEach(function (card) {
        card.remove();
    })
}

// Функция кнопки лайка
function likeButtonHandler(evt) {
    if (evt.target.classList.contains('card__like')) {
        evt.target.classList.toggle('card__like_active')
    }
}

// Функция кнопки удаления карточки
function removeButtonHandler(evt) {
    evt.currentTarget.closest('.card').remove();
}

// Функция открытия попапа - редактирования профиля
function openProfileEditPopup() {
    nameInputElement.value = userNameElement.textContent;
    aboutInputElement.value = userAboutElement.textContent;
    editPopupCloseButton.addEventListener('click', closeProfileEditPopup);
    openPopup(profileEditPopup);
}

// Функция открытия попапа - добавления нового поста
function openNewPostPopup() {
    postPopupCloseButton.addEventListener('click', closeNewPostPopup);
    openPopup(addNewPostPopup);
}

// Функция открытия попапа - фотографии поста в большом размере
function openBigPicPopup(evt) {
    bigPicElement.src = evt.target.src;
    bigPicElement.alt = evt.target.alt;
    bigPicNameElement.textContent = evt.target.alt;
    openPopup(bigPicturePopup);
}

// Функция открытия попапов
function openPopup(popupElement) {
    popupElement.classList.add('popup_visible');
    document.addEventListener('keyup', onEscKeyClosePopup);
}

// Функция закрытия попапов нажатием ESC
function onEscKeyClosePopup(evt) {
    if (evt.key === ESC_KEY) {
        closePopup();
    }
    document.removeEventListener('keyup', onEscKeyClosePopup);
}

// Функция закрытия попапа - редактирования профиля
function closeProfileEditPopup() {
    nameInputElement.value = userNameElement.textContent;
    aboutInputElement.value = userAboutElement.textContent;
    closePopup(profileEditPopup);
}

// Функция закрытия попапа - добавления нового поста
function closeNewPostPopup() {
    postFormElement.reset();
    closePopup(addNewPostPopup);
}

// Функция закрытия попапов
function closePopup() {
    const activePopup = document.querySelector('.popup_visible');
    activePopup.classList.remove('popup_visible');
    document.removeEventListener('keyup', onEscKeyClosePopup);
}

// Функция отправки формы попапов
function formSubmitHandler(evt) {
    evt.preventDefault();
    switch (evt.target.name) {
        case 'editProfileForm':
            userNameElement.textContent = nameInputElement.value;
            userAboutElement.textContent = aboutInputElement.value;
            closePopup();
            break;
        case 'newPostForm':
            const newCardsArr = [];
            const cards = cardsContainer.querySelectorAll('.card');
            const renderedCards = Array.from(cards, function(el) {
                return {
                    name: el.querySelector('.card__pic').alt,
                    link: el.querySelector('.card__pic').src
                }
            });

            if (postFormElement.value !== '' && picSrcElement.value !== '') {
                const newCard = {
                    name: picNameElement.value,
                    link: picSrcElement.value
                }

                newCardsArr.unshift(newCard);
                deleteAllCards();
                createCards(newCardsArr.concat(renderedCards));
            }

            closePopup();
            break;
    }
}

// Функция создания и добавления карточек из моковых данных
function createCards(cardsArr) {

    cardsArr.forEach(function (card) {
        // клонируем содержимое тега template
        const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

        // необходимые элементы каждой карточки
        const cardTitleElement = cardElement.querySelector('.card__title');
        const removeButtonElement = cardElement.querySelector('.card__remove');
        const cardPicElement = cardElement.querySelector('.card__pic');

        // наполняем содержимым клонированный шаблон
        cardPicElement.src = card.link;
        cardPicElement.alt = card.name;
        cardTitleElement.textContent = card.name;

        // обработчики событий на каждой карточке
        removeButtonElement.addEventListener('click', removeButtonHandler);
        cardElement.addEventListener('click', likeButtonHandler);
        cardPicElement.addEventListener('click', (evt) => { openBigPicPopup(evt) });

        // отображаем на странице
        cardsContainer.append(cardElement);
    })
}

createCards(initialCards);

nickEditButton.addEventListener('click', openProfileEditPopup);
addNewPostButton.addEventListener('click', openNewPostPopup);

formElements.forEach(function (el) {
    el.addEventListener('submit', formSubmitHandler);
});
