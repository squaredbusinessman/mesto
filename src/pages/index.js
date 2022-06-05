import './index.css';
import {apiConfig, validationConfig} from '../utils/data.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import Section from '../components/Section';
import UserInfo from '../components/UserInfo';
import Api from '../components/Api';
import PopupWithSubmit from "../components/PopupWithSubmit";

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
let userId = '';

function getUserId(id) {
    return userId = id;
}

// Функция уведомления пользователя о процессе загрузки
function renderLoading ({
                            isLoading,
                            popupDomElement,
                            originalTextOnButton = 'Сохранить',
                            loadingTextOnButton = 'Сохранение...'}) {
    if (isLoading) {
        popupDomElement
            .querySelector('.popup__save-btn')
            .textContent = loadingTextOnButton;
    } else {
        popupDomElement
            .querySelector('.popup__save-btn')
            .textContent = originalTextOnButton;
    }
}

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
                        renderLoading({
                            isLoading: true,
                            popupDomElement: deleteConfirmPopup.getDomElement(),
                            loadingTextOnButton: 'Удаление...'
                        });

                        api.deleteCard(card.getId())
                            .then(() => {
                                card.deleteCard();
                            })
                            .catch(err => console.log(`Произошла ошибка при удалении карточки ${err}`))
                            .finally(() => {
                                renderLoading({
                                    isLoading: false,
                                    popupDomElement: deleteConfirmPopup.getDomElement(),
                                    originalTextOnButton: 'Да'
                                });
                            })

                        deleteConfirmPopup.close();
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
        renderLoading({
            isLoading: true,
            popupDomElement: updateAvatarPopup.getDomElement()
        });

        api.updateAvatar(updateAvatarPopup.dataFromInputs.newAvatarUrl)
            .then(userData => {
                userAvatar.src = userData.avatar;
            })
            .catch(err => console.log(`Произошла ошибка при обновлении аватара ${err}`))
            .finally(() => {
                renderLoading({
                    isLoading: false,
                    popupDomElement: updateAvatarPopup.getDomElement()
                });
            })

        updateAvatarPopup.close();
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
        renderLoading({
            isLoading: true,
            popupDomElement: editProfilePopup.getDomElement()
        })

        api.updateProfile(editProfilePopup.dataFromInputs)
            .then((data) => {
                userData.setUserInfo(data);
            })
            .catch(err => console.log(`Произошла ошибка при отправке новых данных пользователя ${err}`))
            .finally(() => {
                renderLoading({
                    isLoading: false,
                    popupDomElement: editProfilePopup.getDomElement()
                });
            })

        editProfilePopup.close();
    }
});

// Инициализируем слушатели на попапе редактирования юзер-инфо
editProfilePopup.setEventListeners();

// Создаём экземпляр класса для попала нового поста
const newPostPopup = new PopupWithForm({
    popupSelector: '.popup_id_new-post'
}, {
    submitCallback: () => {
        console.log(newPostPopup);
        renderLoading({
            isLoading: true,
            popupDomElement: newPostPopup.getDomElement(),
            loadingTextOnButton: 'Создание...'
        })
        // используя метод api отправляем новую карточку на сервер
        api.addCard(newPostPopup.dataFromInputs)
            .then((cardData) => {
                const newCard = createCard(cardData);
                defaultCardList.addItem({ element: newCard, place: 'prepend'});
            })
            .catch(err => console.log(`Произошла ошибка при отправке данных новой карточки ${err}`))
            .finally(() => {
                renderLoading({
                    isLoading: false,
                    popupDomElement: newPostPopup.getDomElement(),
                    originalTextOnButton: 'Создать'
                });
            })

        newPostPopup.close();
    }});

// Инициализируем слушатели на попапе добавления новой карточки
newPostPopup.setEventListeners();

// Создаём экземпляр класса Апи
const api = new Api(apiConfig);

// Получаем сразу все необходимые для отрисовки данные с сервера
api.getAllData().then(
    (allData) => {
        const [ user, cards ] = allData;

        // Прокидываем данные в экземпляр класса пользователя
        userData.setUserInfo(user);
        userAvatar.src = user.avatar;
        getUserId(user._id);

        // Прокидываем данные в экземпляр класса карточек при загрузке приложения
        defaultCardList.renderItems(cards); // Отрисовываем дефолтный список карточек
    }
).catch((err) => { `Произошла ошибка при получении данных с сервера ${err}` })

// Слушатель кнопки обновления аватара
avatarUpdateButton.addEventListener('click', () => {
    updateAvatarFormValidate.prepareForm();
    updateAvatarPopup.open();
})

// Слушатель кнопки редактировании информации пользователя
nickEditButton.addEventListener('click', () => {
    profileFormValidate.prepareForm();
    nameInputElement.value = userData.getUserInfo().name;
    aboutInputElement.value = userData.getUserInfo().about;
    editProfilePopup.open();
});

//Слушатель кнопки открытия формы создания новой карточки
postAddButton.addEventListener('click', () => {
    newPostFormValidate.prepareForm();
    newPostPopup.open()
});

const updateAvatarFormValidate = new FormValidator(validationConfig, updateAvatarFormElement);
updateAvatarFormValidate.enableValidation();

const profileFormValidate = new FormValidator(validationConfig, profileFormElement);
profileFormValidate.enableValidation();

const newPostFormValidate = new FormValidator(validationConfig, postFormElement);
newPostFormValidate.enableValidation();
