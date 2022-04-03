// Константы
const ESC_KEY = 'Escape';

// Используемые в проекте попапы
const profileEditPopup = document.querySelector('.popup_id_profile-edit');
const addNewPostPopup = document.querySelector('.popup_id_new-post');
const bigPicturePopup = document.querySelector('.popup_id_big-picture');

// Необходимые элементы popup
const editFormElement = profileEditPopup.querySelector('.popup__form');
const nameInputElement = editFormElement.querySelector('.popup__input_type_name');
const aboutInputElement = editFormElement.querySelector('.popup__input_type_about');
const editPopupCloseButton = profileEditPopup.querySelector('.popup__close-btn');
const editPopupSaveButton = profileEditPopup.querySelector('.popup__save-btn');

const postFormElement = addNewPostPopup.querySelector('.popup__form');
const picNameElement = postFormElement.querySelector('.popup__input_type_name');
const picSrcElement = postFormElement.querySelector('.popup__input_type_about');
const postPopupCloseButton = addNewPostPopup.querySelector('.popup__close-btn');
const postPopupSaveButton = addNewPostPopup.querySelector('.popup__save-btn');

const bigPicElement = bigPicturePopup.querySelector('.popup__img');
const bigPicNameElement = bigPicturePopup.querySelector('.popup__name');
const bigPicCloseButton = bigPicturePopup.querySelector('.popup__close-btn');

// Необходимые элементы блока user
const userSectionElement = document.querySelector('.user');
const userNameElement = userSectionElement.querySelector('.user__name');
const userAboutElement = userSectionElement.querySelector('.user__about');
const nickEditButton = userSectionElement.querySelector('.user__nick-editor-btn');
const addNewPostButton = userSectionElement.querySelector('.user__add-post-btn');

// Необходимые элементы карточек
const cardsContainer = document.querySelector('.cards');
const cardTemplate = document.querySelector('#card-template').content;

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
    bigPicCloseButton.addEventListener('click', closePopup);
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

// Функция отправки формы редактирования профиля
function editFormSubmitHandler(evt) {
    evt.preventDefault();
        userNameElement.textContent = nameInputElement.value;
        userAboutElement.textContent = aboutInputElement.value;
        closeProfileEditPopup();
}

// Функция отправки формы создания нового поста
function newPostFormSubmitHandler(evt) {
    evt.preventDefault();
    const newCard = {
        name: picNameElement.value,
        link: picSrcElement.value,
    }

   renderCard(newCard, cardsContainer);
    closeNewPostPopup();
}

// Функция создания карточки
function getCardElement() {
    // клонируем содержимое тега template
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    // необходимые элементы каждой карточки
    const cardPicElement = cardElement.querySelector('.card__pic');
    const removeButtonElement = cardElement.querySelector('.card__remove');
    // обработчики событий на каждой карточке
    cardElement.addEventListener('click', likeButtonHandler);
    removeButtonElement.addEventListener('click', removeButtonHandler);
    cardPicElement.addEventListener('click', (evt) => { openBigPicPopup(evt) });

    return cardElement;
}

// Функция отображения карточки на странице
function renderCard(card, container) {
    const cardElement = getCardElement();
    // необходимые элементы каждой карточки
    const cardTitleElement = cardElement.querySelector('.card__title');
    const cardPicElement = cardElement.querySelector('.card__pic');
    // наполняем содержимым клонированный шаблон
    cardPicElement.src = card.link;
    cardPicElement.alt = card.name;
    cardTitleElement.textContent = card.name;

    container.prepend(cardElement);
}

function renderCards(cardsArr) {
    cardsArr.forEach((card) => {
        renderCard(card, cardsContainer);
    });
}

renderCards(initialCards);
nickEditButton.addEventListener('click', openProfileEditPopup);
addNewPostButton.addEventListener('click', openNewPostPopup);
editPopupSaveButton.addEventListener('click', editFormSubmitHandler);
postPopupSaveButton.addEventListener('click', newPostFormSubmitHandler);
