// Конфиги
export const validationConfig = {
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__save-btn',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_visible',
};

export const apiConfig = {
    cardsUrl: 'https://mesto.nomoreparties.co/v1/cohort-42/cards',
    userUrl: 'https://mesto.nomoreparties.co/v1/cohort-42/users/me',
    headers: {
        authorization: '7f1a4a53-4bab-4bd4-9a8f-30c3df078826',
        'Content-Type': 'application/json'
    },
}
