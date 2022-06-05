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
};

export const BUTTON_TEXTS = {
    '.popup_id_delete-confirm': 'Да',
    '.popup_id_new-avatar': 'Сохранить',
    '.popup_id_new-post': 'Создать',
    '.popup_id_profile-edit': 'Сохранить',
    loadingText: 'Сохранение...',
};
