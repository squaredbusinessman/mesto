import '../pages/index.css';
import {apiConfig, validationConfig} from './data.js';
import Card from './Card.js';
import FormValidator from './FormValidator.js';
import PopupWithForm from './PopupWithForm.js';
import PopupWithImage from './PopupWithImage.js';
import Section from './Section';
import UserInfo from './UserInfo';
import Api from './Api';
import PopupWithSubmit from "./PopupWithSubmit";

// Используемые в проекте попапы и их общие элементы
const profilePopup = document.querySelector('.popup_id_profile-edit');
const postPopup = document.querySelector('.popup_id_new-post');

// Необходимые элементы popup
const profileFormElement = profilePopup.querySelector('.popup__form');
const nameInputElement = profileFormElement.querySelector('.popup__input_type_name');
const aboutInputElement = profileFormElement.querySelector('.popup__input_type_about');

const postFormElement = postPopup.querySelector('.popup__form');

const updateAvatarFormElement = document.querySelector('.popup__form_type_avatar');

// Необходимые элементы блока user
const userSectionElement = document.querySelector('.user');
const avatarUpdateButton = userSectionElement.querySelector('.user__avatar-editor-btn');
const nickEditButton = userSectionElement.querySelector('.user__nick-editor-btn');
const postAddButton = userSectionElement.querySelector('.user__add-post-btn');
const userAvatar = userSectionElement.querySelector('.user__avatar');

// Необходимые элементы карточек
const cardsContainer = document.querySelector('.cards');
const cardTemplateClass = '#card-template';

// Id владельца страницы с карточками
const userId = apiConfig.userId;

// Создаем дефолтный список карточек, через экземпляр класса Section
const defaultCardList = new Section({
    rendererFunction: (cardData) => {
        const card = createCard(cardData);
        defaultCardList.addItem({ element: card, place: 'append'});
    }
}, cardsContainer);

// Создаём экземпляр класса попапа с картинкой
const bigPicturePopup = new PopupWithImage({ popupSelector: '.popup_id_big-picture' });

// Вешаем необходимые обработчики
bigPicturePopup.setEventListeners();

// Функция создания экземпляра класса карточки
function createCard(cardData) {
    return new Card(
        cardData,
        cardTemplateClass,
        userId,
        {
            handleCardClick: () => {
                bigPicturePopup.open(cardData);
            },
            handleLikeClick: (card) => {
                // получаем элемент конкретной карточки
                const cardElement = card.returnDomElement();

                // запускаем условную проверку на наличие поставленного лайка
                if (cardElement.querySelector('.card__like_active')) {
                    api.cardDislike(card.getId())
                        .then(
                            resCard => { card.activateLike(resCard['likes']) }
                        )
                        .catch(err => console.log(`Произошла ошибка при удалении лайка - Error: ${err}`))
                } else {
                    api.cardLike(card.getId())
                        .then(
                            resCard => { card.activateLike(resCard['likes']) }
                        )
                        .catch(err => console.log(`Произошла ошибка при установке лайка - Error: ${err}`))
                }
            },
            handleDeleteClick: (card) => {
                deleteConfirmPopup.open();
                deleteConfirmPopup.setSubmitHandler({
                    submitHandler: () => {
                        api.deleteCard(card.getId())
                            .then(() => {
                                card.deleteCard();
                                deleteConfirmPopup.close();
                            })
                            .catch(err => console.log(`Произошла ошибка при удалении карточки ${err}`))
                    }
                });
            }
        }
    ).getCard();
}

// Создаём экземпляр класса попапа подтверждения удаления карточки
const deleteConfirmPopup = new PopupWithSubmit({
    popupSelector: '.popup_id_delete-confirm'
});

deleteConfirmPopup.setEventListeners();

// Создаём экземпляр класса попапа обновления аватара
const updateAvatarPopup = new PopupWithForm({
    popupSelector: '.popup_id_new-avatar'
}, {
    submitCallback: () => {
        api.updateAvatar(updateAvatarPopup.dataFromInputs.newAvatarUrl)
            .then(userData => {
                userAvatar.src = userData.avatar;
                updateAvatarPopup.close();
            })
            .catch(err => console.log(`Произошла ошибка при обновлении аватара ${err}`))
    }
});

updateAvatarPopup.setEventListeners();

// Экземпляр класса данных пользователя
const userData = new UserInfo({
    userNameSelector: '.user__name',
    userAboutSelector: '.user__about'
})

// Создаём экземпляр класса для попапа с изменением информации юзера
const editProfilePopup = new PopupWithForm({
    popupSelector: '.popup_id_profile-edit',
}, {
    submitCallback: () => {
        api.updateProfile(editProfilePopup.dataFromInputs)
            .then((data) => {
                userData.setUserInfo(data);
                editProfilePopup.close();
            })
            .catch(err => console.log(`Произошла ошибка при отправке новых данных пользователя ${err}`));

    }
});

// Инициализируем слушатели на попапе редактирования юзер-инфо
editProfilePopup.setEventListeners();

// Создаём экземпляр класса для попала нового поста
const newPostPopup = new PopupWithForm({
    popupSelector: '.popup_id_new-post'
}, {
    submitCallback: () => {
        // используя метод api отправляем новую карточку на сервер
        api.addCard(newPostPopup.dataFromInputs)
            .then((cardData) => {
                const newCard = createCard(cardData);
                defaultCardList.addItem({ element: newCard, place: 'prepend'});
                newPostPopup.close();
            })
            .catch(err => console.log(`Произошла ошибка при отправке данных новой карточки ${err}`));

    }});

// Инициализируем слушатели на попапе добавления новой карточки
newPostPopup.setEventListeners();

// Создаём экземпляр класса Апи
const api = new Api(apiConfig);

// Получаем данные о пользователе с сервера, и сразу прокидываем их в блок информации о пользователе
api.getProfile()
    .then((data) => {
        userData.setUserInfo(data);
        userAvatar.src = data.avatar;
    })
    .catch((err) => console.log('Произошла ошибка ' + err));

// Получаем данные о карточках ГЕТ-запросом
api.getCards()
    .then((cardsData) => {
        defaultCardList.renderItems(cardsData); // Отрисовываем дефолтный список карточек
    })
    .catch((err) => console.log('Произошла ошибка ' + err));

avatarUpdateButton.addEventListener('click', () => {
    updateAvatarFormValidate.prepareForm();
    updateAvatarPopup.open();
})

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

const updateAvatarFormValidate = new FormValidator(validationConfig, updateAvatarFormElement);
updateAvatarFormValidate.enableValidation();

const profileFormValidate = new FormValidator(validationConfig, profileFormElement);
profileFormValidate.enableValidation();

const newPostFormValidate = new FormValidator(validationConfig, postFormElement);
newPostFormValidate.enableValidation();
