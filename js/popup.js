import initialCards from "./cards-data";

// Константы
const ESC_KEY = 'Escape';

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
        popupElements.forEach(function (el) {
            el.classList.add('visually-hidden');
        });
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
        popupElements.forEach(function (el) {
            el.classList.add('visually-hidden');
        })
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

nickEditButton.addEventListener('click', openPopup);
addNewPostButton.addEventListener('click', openPopup);
popupCloseButtons.forEach(function (el) {
    el.addEventListener('click', closePopup);
});
formElement.addEventListener('submit', formSubmitHandler);
