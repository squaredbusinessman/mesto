// Константы
const ESC_KEY = 'Escape';

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

// Используемые в проекте попапы
let profileEditPopup = document.querySelector('.popup_id_profile-edit');
let addNewPostPopup = document.querySelector('.popup_id_new-post');

// Необходимые элементы формы popup
let popupElements = document.querySelectorAll('.popup');
let formElement = popupElements[0].querySelector('.popup__form');
let nameInputElement = formElement.querySelector('.popup__input_type_name');
let aboutInputElement = formElement.querySelector('.popup__input_type_about');
let popupCloseButtons = document.querySelectorAll('.popup__close-btn');

// Необходимые элементы блока user
let userSectionElement = document.querySelector('.user');
let userNameElement = userSectionElement.querySelector('.user__name');
let userAboutElement = userSectionElement.querySelector('.user__about');
let nickEditButton = userSectionElement.querySelector('.user__nick-editor-btn');
let addNewPostButton = userSectionElement.querySelector('.user__add-post-btn');

// Необходимые элементы для отрисовки карточек
let cardsContainer = document.querySelector('.cards');

// Функция проверки наличия класса .visually-hidden у попапов
function hasVisibleClass(popups) {
    popups.forEach(function (el) {
        if (!el.classList.contains('visually-hidden')) {
            el.classList.add('visually-hidden');
        }
    });
}

// Функция открытия попапов
function openPopup(evt) {
    switch (evt.target) {
        case nickEditButton:
            profileEditPopup.classList.remove('visually-hidden');
            nameInputElement.value = userNameElement.textContent;
            aboutInputElement.value = userAboutElement.textContent;
            nickEditButton.removeEventListener('click', openPopup);
            break;
        case addNewPostButton:
            addNewPostPopup.classList.remove('visually-hidden');
            addNewPostButton.removeEventListener('click', openPopup);
            break;
    }

    document.addEventListener('keyup', onEscKeyClosePopup);
}

// Функция закрытия попапов нажатием ESC
function onEscKeyClosePopup(evt) {
    if (evt.key === ESC_KEY) {
        hasVisibleClass(popupElements);
        nameInputElement.value = userNameElement.textContent;
        aboutInputElement.value = userAboutElement.textContent;
    }
    document.removeEventListener('keyup', onEscKeyClosePopup);
    nickEditButton.addEventListener('click', openPopup);
    addNewPostButton.addEventListener('click', openPopup);
}

// Функция закрытия попапов
function closePopup(evt = null) {

    if (evt === null) {
        hasVisibleClass(popupElements);
        nickEditButton.addEventListener('click', openPopup);
        addNewPostButton.addEventListener('click', openPopup);
    } else if (evt.target.parentElement.closest('.popup_id_new-post')) {
        addNewPostPopup.classList.add('visually-hidden');
        nameInputElement.value = '';
        aboutInputElement.value = '';
        addNewPostButton.addEventListener('click', openPopup);
    } else if (evt.target.parentElement.closest('.popup_id_profile-edit')) {
        profileEditPopup.classList.add('visually-hidden');
        nameInputElement.value = userNameElement.textContent;
        aboutInputElement.value = userAboutElement.textContent;
        nickEditButton.addEventListener('click', openPopup);
    }

    document.removeEventListener('keyup', onEscKeyClosePopup);
}

// Функция отправки формы попапов
function formSubmitHandler(evt) {
    evt.preventDefault();
    if (evt.target.name === 'editProfileForm') {
        let nameValue = nameInputElement.value;
        let aboutValue = aboutInputElement.value;

        userNameElement.textContent = nameValue;
        userAboutElement.textContent = aboutValue;
        closePopup();
    }   else if (evt.target.name === 'newPostForm') {

        closePopup();
    }
}

// Функция создания и добавления карточек из моковых данных
function createCards(cards) {

    cards.forEach(function (card) {
        const cardTemplate = document.querySelector('#card-template').content;

        // клонируем содержимое тега template
        const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

        // наполняем содержимым
        cardElement.querySelector('.card__pic').src = card.link;
        cardElement.querySelector('.card__pic').alt = card.name;
        cardElement.querySelector('.card__title').textContent = card.name;

        // отображаем на странице
        cardsContainer.append(cardElement);

    })
}

createCards(initialCards);
nickEditButton.addEventListener('click', openPopup);
addNewPostButton.addEventListener('click', openPopup);
popupCloseButtons.forEach(function (el) {
    el.addEventListener('click', closePopup);
});
formElement.addEventListener('submit', formSubmitHandler);
