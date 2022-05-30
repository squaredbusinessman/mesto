import '../pages/index.css';
import { validationConfig } from './data.js';
import Card from './Card.js';
import FormValidator from './FormValidator.js';
import PopupWithForm from './PopupWithForm.js';
import PopupWithImage from './PopupWithImage.js';
import Section from "./Section";
import UserInfo from "./UserInfo";

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

// Получаем данные о пользователе с сервера, и сразу прокидываем их в блок информации о пользователе
fetch('https://mesto.nomoreparties.co/v1/cohort-42/users/me', {
    headers: {
        authorization: '7f1a4a53-4bab-4bd4-9a8f-30c3df078826',
        'Content-Type': 'application/json'
    }
})
    .then((res) => {
        if (res.ok) {
            return res.json();
    } else {
            return Promise.reject('Произошла ошибка при получении данных пользователя');
        }
    })
    .then((data) => {
        userData.setUserInfo(data);
    })
    .catch((err) => console.log('Произошла ошибка ' + err));

// Получаем данные о карточках ГЕТ-запросом
fetch('https://mesto.nomoreparties.co/v1/cohort-42/cards', {
    headers: {
        authorization: '7f1a4a53-4bab-4bd4-9a8f-30c3df078826',
        'Content-Type': 'application/json'
    }
})
    .then((res) => {
        if (res.ok) {
            return res.json();
        } else {
            return Promise.reject('Произошла ошибка при получении данных каточек')
        }
    })
    .then((cardsData) => {
        const defaultCardList = new Section({
            // Создаём дефолтный список карточек
            itemsArray: cardsData,
            rendererFunction: (cardData) => {
                const card = createCard(cardData);
                defaultCardList.addItem({ element: card, place: 'append'});
            }
        }, cardsContainer);

        defaultCardList.renderItems(); // Отрисовываем дефолтный список карточек
    })
    .catch((err) => console.log('Произошла ошибка ' + err));

// Создаём экземпляр класса попапа с картинкой
const bigPicturePopup = new PopupWithImage({ popupSelector: '.popup_id_big-picture' });
// Вешаем необходимые обработчики
bigPicturePopup.setEventListeners();

// Функция создания экземпляра класса карточки
function createCard(cardData) {
    return new Card(
        cardData,
        cardTemplateClass,
        { handleCardClick: () => {
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
