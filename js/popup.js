// Константы
const ESC_KEY = 'Escape';

// Используемые в проекте попапы
const overlays = document.querySelectorAll('.popup');
const profileEditPopup = document.querySelector('.popup_id_profile-edit');
const addNewPostPopup = document.querySelector('.popup_id_new-post');
const bigPicturePopup = document.querySelector('.popup_id_big-picture');

// Необходимые элементы popup
const editFormElement = profileEditPopup.querySelector('.popup__form');
const nameInputElement = editFormElement.querySelector('.popup__input_type_name');
const aboutInputElement = editFormElement.querySelector('.popup__input_type_about');
const editPopupSaveButton = profileEditPopup.querySelector('.popup__save-btn');
const popupCloseButtons = document.querySelectorAll('.popup__close-btn');

const postFormElement = addNewPostPopup.querySelector('.popup__form');
const picNameElement = postFormElement.querySelector('.popup__input_type_name');
const picSrcElement = postFormElement.querySelector('.popup__input_type_about');
const postPopupSaveButton = addNewPostPopup.querySelector('.popup__save-btn');

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
    openPopup(profileEditPopup);
}

// Функция открытия попапа - добавления нового поста
function openNewPostPopup() {
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
    closePopup(addNewPostPopup);
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
overlays.forEach(function(overlay) {
    overlay.addEventListener('click', overlayClosePopup);
})
nickEditButton.addEventListener('click', openProfileEditPopup);
addNewPostButton.addEventListener('click', openNewPostPopup);
editPopupSaveButton.addEventListener('click', editFormSubmitHandler);
postPopupSaveButton.addEventListener('click', newPostFormSubmitHandler);

popupCloseButtons.forEach(function(button) {
    button.addEventListener('click', closePopup);
});
