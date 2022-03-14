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

function openPopup() {
    popupElement.classList.remove('visually-hidden');
    nameInputElement.value = userNameElement.textContent;
    aboutInputElement.value = userAboutElement.textContent;
    nickEditButton.removeEventListener('click', openPopup);
}

function onEscKeyClosePopup(evt) {
    if (evt.key === ESC_KEY) {
        popupElement.classList.add('visually-hidden');
        nameInputElement.value = userNameElement.textContent;
        aboutInputElement.value = userAboutElement.textContent;
    }
}

function closePopup() {
    popupElement.classList.add('visually-hidden');
    nameInputElement.value = userNameElement.textContent;
    aboutInputElement.value = userAboutElement.textContent;
    document.removeEventListener('keyup', onEscKeyClosePopup);
}

nickEditButton.addEventListener('click', openPopup);
popupCloseButton.addEventListener('click', closePopup);
document.addEventListener('keyup', onEscKeyClosePopup);
