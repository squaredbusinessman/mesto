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
const profileEditPopup = document.querySelector('.popup_id_profile-edit');
const addNewPostPopup = document.querySelector('.popup_id_new-post');

// Необходимые элементы формы popup
const popupElements = document.querySelectorAll('.popup');
const formElements = document.querySelectorAll('.popup__form');
const editFormElement = popupElements[0].querySelector('.popup__form');
const nameInputElement = editFormElement.querySelector('.popup__input_type_name');
const aboutInputElement = editFormElement.querySelector('.popup__input_type_about');
const postFormElement = popupElements[1].querySelector('.popup__form');
const picNameElement = postFormElement.querySelector('.popup__input_type_name');
const picSrcElement = postFormElement.querySelector('.popup__input_type_about');

const popupCloseButtons = document.querySelectorAll('.popup__close-btn');

// Необходимые элементы блока user
let userSectionElement = document.querySelector('.user');
let userNameElement = userSectionElement.querySelector('.user__name');
let userAboutElement = userSectionElement.querySelector('.user__about');
let nickEditButton = userSectionElement.querySelector('.user__nick-editor-btn');
let addNewPostButton = userSectionElement.querySelector('.user__add-post-btn');

// Необходимые элементы для отрисовки карточек
let cardsContainer = document.querySelector('.cards');
const cardTemplate = document.querySelector('#card-template').content;


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
            picNameElement.value = '';
            picSrcElement.value = '';
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
        picNameElement.value = '';
        picSrcElement.value = '';
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
    switch (evt.target.name) {
        case 'editProfileForm':
            userNameElement.textContent = nameInputElement.value;
            userAboutElement.textContent = aboutInputElement.value;
            closePopup();
            break;
        case 'newPostForm':
            const newCardsArr = [];
            const cards = cardsContainer.querySelectorAll('.card');
            const renderedCards = Array.from(cards, function(el) {
                return {
                    name: el.querySelector('.card__pic').alt,
                    link: el.querySelector('.card__pic').src
                }
            });

            if (postFormElement.value !== '' && picSrcElement.value !== '') {
                const newCard = {
                    name: picNameElement.value,
                    link: picSrcElement.value
                }

                newCardsArr.unshift(newCard);
                deleteAllCards();
                createCards(newCardsArr.concat(renderedCards));
            }

            closePopup();
            break;
    }
}

// Функция создания и добавления карточек из моковых данных
function createCards(cardsArr) {

    cardsArr.forEach(function (card) {
        // клонируем содержимое тега template
        const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

        // необходимые элементы каждой карточки
        const cardPicElement = cardElement.querySelector('.card__pic');
        const cardTitleElement = cardElement.querySelector('.card__title');
        const removeButtonElement = cardElement.querySelector('.card__remove');


        // наполняем содержимым клонированный шаблон
        cardPicElement.src = card.link;
        cardPicElement.alt = card.name;
        cardTitleElement.textContent = card.name;

        // обработчик лайка
        removeButtonElement.addEventListener('click', removeButtonHandler);
        cardElement.addEventListener('click', likeButtonHandler);


        // отображаем на странице
        cardsContainer.append(cardElement);
    })
}

// Функция удаления карточек
function deleteAllCards() {
    const cards = cardsContainer.querySelectorAll('.card');
    cards.forEach(function (card) {
        card.remove();
    })
}

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

createCards(initialCards);
nickEditButton.addEventListener('click', openPopup);
addNewPostButton.addEventListener('click', openPopup);
popupCloseButtons.forEach(function (el) {
    el.addEventListener('click', closePopup);
});
formElements.forEach(function (el) {
    el.addEventListener('submit', formSubmitHandler);
});
