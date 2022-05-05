import Card from './Card.js';
import FormValidator from './FormValidator.js';

// Моковые данные
const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

// Конфиги
const validationConfig = {
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__save-btn',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_visible',
};

// Константы
const ESC_KEY = 'Escape';

// Используемые в проекте попапы и их общие элементы
const overlays = document.querySelectorAll('.popup');
const profilePopup = document.querySelector('.popup_id_profile-edit');
const postPopup = document.querySelector('.popup_id_new-post');
const picturePopup = document.querySelector('.popup_id_big-picture');
const popupCloseButtons = document.querySelectorAll('.popup__close-btn');

// Необходимые элементы popup
const profileFormElement = profilePopup.querySelector('.popup__form');
const nameInputElement = profileFormElement.querySelector('.popup__input_type_name');
const aboutInputElement = profileFormElement.querySelector('.popup__input_type_about');
const profileFormSubmit = profilePopup.querySelector('.popup__save-btn');

const postFormElement = postPopup.querySelector('.popup__form');
const picNameElement = postFormElement.querySelector('.popup__input_type_name');
const picSrcElement = postFormElement.querySelector('.popup__input_type_about');
const postFormSubmit = postPopup.querySelector('.popup__save-btn');

const picElement = picturePopup.querySelector('.popup__img');
const picTitleElement = picturePopup.querySelector('.popup__name');

// Необходимые элементы блока user
const userSectionElement = document.querySelector('.user');
const userNameElement = userSectionElement.querySelector('.user__name');
const userAboutElement = userSectionElement.querySelector('.user__about');
const nickEditButton = userSectionElement.querySelector('.user__nick-editor-btn');
const postAddButton = userSectionElement.querySelector('.user__add-post-btn');

// Необходимые элементы карточек
const cardsContainer = document.querySelector('.cards');
const cardTemplateClass = '#card-template';

// Функция открытия попапа - редактирования профиля
function openProfileEditPopup() {
    const profileFormValidate = new FormValidator(validationConfig, profileFormElement);
    profileFormValidate.enableValidation();
    nameInputElement.value = userNameElement.textContent;
    aboutInputElement.value = userAboutElement.textContent;
    openPopup(profilePopup);
}

// Функция открытия попапа - добавления нового поста
function openNewPostPopup() {
    const newPostFormValidate = new FormValidator(validationConfig, postFormElement);
    newPostFormValidate.enableValidation();
    openPopup(postPopup);
}

// Функция открытия попапа - фотографии поста в большом размере
function openBigPicPopup(evt) {
    picElement.src = evt.target.src;
    picElement.alt = evt.target.alt;
    picTitleElement.textContent = evt.target.alt;
    openPopup(picturePopup);
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
}

// Функция закрытия попапа - редактирования профиля
function closeProfileEditPopup() {
    nameInputElement.value = userNameElement.textContent;
    aboutInputElement.value = userAboutElement.textContent;
    closePopup(profilePopup);
}

// Функция закрытия при клике на оверлей
function overlayClosePopup(evt) {
    evt.stopPropagation();
    if (evt.target.classList.contains('popup')) {
        closePopup();
    }
}

// Функция закрытия попапа - добавления нового поста
function closeNewPostPopup() {
    closePopup(postPopup);
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
    const newCardData = {
        name: picNameElement.value,
        link: picSrcElement.value,
    }

   renderCard(newCardData, cardsContainer);
    closeNewPostPopup();
}

// Функция отображения карточки на странице
function renderCard(cardData, container) {
    const cardElement = new Card(cardData, cardTemplateClass, openBigPicPopup).getCard();
    container.prepend(cardElement);
}

initialCards.forEach((cardData) => {
    renderCard(cardData, cardsContainer);
})

overlays.forEach(function(overlay) {
    overlay.addEventListener('click', overlayClosePopup);
})

nickEditButton.addEventListener('click', openProfileEditPopup);
postAddButton.addEventListener('click', openNewPostPopup);
profileFormSubmit.addEventListener('click', editFormSubmitHandler);
postFormSubmit.addEventListener('click', newPostFormSubmitHandler);

popupCloseButtons.forEach(function(button) {
    button.addEventListener('click', closePopup);
});
