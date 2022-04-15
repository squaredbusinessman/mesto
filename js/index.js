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
const cardTemplate = document.querySelector('#card-template').content;

// Функция кнопки лайка
function likeButtonHandler(evt) {
    evt.target.classList.toggle('card__like_active');
}

// Функция кнопки удаления карточки
function removeButtonHandler(evt) {
    evt.currentTarget.closest('.card').remove();
}

// Функция открытия попапа - редактирования профиля
function openProfileEditPopup() {
    nameInputElement.value = userNameElement.textContent;
    aboutInputElement.value = userAboutElement.textContent;
    openPopup(profilePopup);
}

// Функция открытия попапа - добавления нового поста
function openNewPostPopup() {
    openPopup(postPopup);
}

// Функция открытия попапа - фотографии поста в большом размере
function openBigPicPopup(evt) {
    picTitleElement.src = evt.target.src;
    picTitleElement.alt = evt.target.alt;
    picNameElement.textContent = evt.target.alt;
    openPopup(picturePopup);
}

// Функция дизэйбла кнопки отправки при повторном открытии попапа с инпутами
const disableSubmit = (popupElement) => {
    const activePopupForm = popupElement.querySelector('.popup__form');
    if (activePopupForm) {
        const activePopupSubmitBtn = activePopupForm.querySelector('.popup__save-btn');
        activePopupSubmitBtn.setAttribute('disabled', 'disabled');
    }
}

// Функция открытия попапов
function openPopup(popupElement) {
    popupElement.classList.add('popup_visible');
    disableSubmit(popupElement);
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
    postFormElement.reset();
    closePopup(postPopup);
}

// Функция очистки полей формы
function resetFormFields(activePopup) {
    const activePopupForm = activePopup.querySelector('.popup__form');
    if (activePopupForm) {
        activePopupForm.reset();
    }
}

// Функция сброса ошибок полей формы
function cancelInputErrors(activePopup) {
    const inputList = Array.from(activePopup.querySelectorAll('.popup__input'));
    inputList.forEach(function (inputElement) {
        const errorElement = activePopup.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.remove('popup__input_type_error');
        errorElement.classList.remove('popup__input-error_visible');
        errorElement.textContent = '';
    })
}

// Функция закрытия попапов
function closePopup() {
    const activePopup = document.querySelector('.popup_visible');
    resetFormFields(activePopup);
    cancelInputErrors(activePopup);
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
    const likeButton = cardElement.querySelector('.card__like');
    // обработчики событий на каждой карточке
    likeButton.addEventListener('click', likeButtonHandler);
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
