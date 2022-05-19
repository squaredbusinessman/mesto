import '../pages/index.css';
import Card from './Card.js';
import FormValidator from './FormValidator.js';
import PopupWithForm from './PopupWithForm.js';
import PopupWithImage from './PopupWithImage.js';
import Section from "./Section";
import UserInfo from "./UserInfo";

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

// Используемые в проекте попапы и их общие элементы
const profilePopup = document.querySelector('.popup_id_profile-edit');
const postPopup = document.querySelector('.popup_id_new-post');

// Необходимые элементы popup
const profileFormElement = profilePopup.querySelector('.popup__form');
const nameInputElement = profileFormElement.querySelector('.popup__input_type_name');
const aboutInputElement = profileFormElement.querySelector('.popup__input_type_about');

const postFormElement = postPopup.querySelector('.popup__form');


// Необходимые элементы блока user
const userSectionElement = document.querySelector('.user');
const nickEditButton = userSectionElement.querySelector('.user__nick-editor-btn');
const postAddButton = userSectionElement.querySelector('.user__add-post-btn');

// Необходимые элементы карточек
const cardsContainer = document.querySelector('.cards');
const cardTemplateClass = '#card-template';

// Создаём экземпляр класса попапа с картинкой
const bigPicturePopup = new PopupWithImage({ popupSelector: '.popup_id_big-picture' });
// Вешаем необходимые обработчики
bigPicturePopup.setEventListeners();

// Функция создания экземпляра класса карточки
function createCard(cardData) {
    return new Card(
        cardData,
        cardTemplateClass,
        { handleCardClick: (evt) => {
                console.log(cardData);
                bigPicturePopup.open(cardData);
            }}
    ).getCard();
}

// Экземпляр класса данных пользователя
const userData = new UserInfo({
    userNameSelector: '.user__name',
    userAboutSelector: '.user__about'
})

const editProfilePopup = new PopupWithForm({
// Создаём экземпляр класса для попапа с изменением информации юзера
        popupSelector: '.popup_id_profile-edit',
    }, {
        submitCallback: () => {
            userData.setUserInfo(editProfilePopup.dataFromInputs);

            editProfilePopup.close();
    }
});

editProfilePopup.setEventListeners(); // Инициализируем слушатели

const newPostPopup = new PopupWithForm({
// Создаём экземпляр класса для попала нового поста
        popupSelector: '.popup_id_new-post'
    }, {
        submitCallback: () => {
            const newCard = createCard(newPostPopup.dataFromInputs);
            defaultCardList.addItem({ element: newCard, place: 'prepend'});

            newPostPopup.close();
    }});

newPostPopup.setEventListeners(); // Инициализируем слушатели

const defaultCardList = new Section({
    // Создаём дефолтный список карточек
    itemsArray: initialCards,
    rendererFunction: (cardData) => {
        const card = createCard(cardData);
        defaultCardList.addItem({ element: card, place: 'append'});
    }
}, cardsContainer);

defaultCardList.renderItems(); // Отрисовываем дефолтный список карточек

nickEditButton.addEventListener('click', () => {
    // перенёс логику подготовки в обработчик открытия попапа
    profileFormValidate.prepareForm();
    nameInputElement.value = userData.getUserInfo().name;
    aboutInputElement.value = userData.getUserInfo().about;
    editProfilePopup.open();
});

postAddButton.addEventListener('click', () => {
    // перенёс логику подготовки в обработчик открытия попапа
    newPostFormValidate.prepareForm();
    newPostPopup.open()
});

const profileFormValidate = new FormValidator(validationConfig, profileFormElement);
profileFormValidate.enableValidation();

const newPostFormValidate = new FormValidator(validationConfig, postFormElement);
newPostFormValidate.enableValidation();
