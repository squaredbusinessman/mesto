// Константы
ESC_KEY = 'Escape';
// Необходимые элементы формы
let popupElement = document.querySelector('.popup');
let formElement = popupElement.querySelector('.popup__form');
let nameInputElement = formElement.querySelector('.popup__name');
let aboutInputElement = formElement.querySelector('.popup__about');
let popupCloseButton = popupElement.querySelector('.popup__close-btn');
let popupSaveButton = formElement.querySelector('.popup__save-btn');
// Необходимые элементы
let userSectionElement = document.querySelector('.user');
let userNameElement = userSectionElement.querySelector('.user__name');
let userAboutElement = userSectionElement.querySelector('.user__about');
let nickEditButton = userSectionElement.querySelector('.user__nick-editor-btn');

nickEditButton.addEventListener('click', function () {
    popupElement.classList.remove('visually-hidden');
})

popupCloseButton.addEventListener('click', function () {
    popupElement.classList.add('visually-hidden');
})

document.addEventListener('keyup', function (evt) {
    if (evt.key === ESC_KEY) {
        popupElement.classList.add('visually-hidden');
    }
})
