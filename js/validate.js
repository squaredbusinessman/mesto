export const validationConfig = {
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__save-btn',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_visible',
};

// Функция дизэйбла кнопки отправки при повторном открытии попапа с инпутами
const disableSubmit = (formElement, config) => {
    const activePopupSubmitBtn = formElement.querySelector(config.submitButtonSelector);
    activePopupSubmitBtn.setAttribute('disabled', 'disabled');
}

// Функция подготовки попапа с формой
const prepareForm = (activePopup, config) => {
    const formElement = activePopup.querySelector(config.formSelector);
    const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
    inputList.forEach((inputElement) => {
        hideInputError({ formElement, inputElement, ...config});
    })
    formElement.reset();
    disableSubmit(formElement, config);
}

const showInputError = (formElement, inputElement, errorMessage, inputErrorClass, errorClass) => {
    // Находим элемент ошибки внутри самой функции
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    // Остальной код такой же
    inputElement.classList.add(inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(errorClass);
};

const hideInputError = ({ formElement, inputElement, inputErrorClass, errorClass }) => {
    // Находим элемент ошибки
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    // Остальной код такой же
    inputElement.classList.remove(inputErrorClass);
    errorElement.classList.remove(errorClass);
    errorElement.textContent = '';
};

// Функция isValid теперь принимает formElement и inputElement,
// а не берёт их из внешней области видимости
const isValid = (formElement, inputElement, inputErrorClass, errorClass) => {
    if (!inputElement.validity.valid) {
        // showInputError теперь получает параметром форму, в которой
        // находится проверяемое поле, и само это поле
        showInputError(formElement, inputElement, inputElement.validationMessage, inputErrorClass, errorClass);
    } else {
        // hideInputError теперь получает параметром форму, в которой
        // находится проверяемое поле, и само это поле
        hideInputError({ formElement, inputElement, inputErrorClass, errorClass });
    }
};

// Функция принимает массив полей ввода
// и элемент кнопки, состояние которой нужно менять
const toggleButtonState = ({ formElement, buttonElement }) => {
    // Если есть хотя бы один невалидный инпут
    if (!formElement.checkValidity()) {
        // сделай кнопку неактивной
        buttonElement.setAttribute('disabled', 'disabled');
    } else {
        // иначе сделай кнопку активной
        buttonElement.removeAttribute('disabled');
    }
};

const setEventListeners = (formElement, inputSelector, submitButtonSelector, inputErrorClass, errorClass) => {
    // Находим все поля внутри формы,
    // сделаем из них массив методом Array.from
    const inputList = Array.from(formElement.querySelectorAll(inputSelector));
    const buttonElement = formElement.querySelector(submitButtonSelector);
    // Вызовем toggleButtonState, чтобы не ждать ввода данных в поля
    toggleButtonState({ formElement, buttonElement });
    // Обойдём все элементы полученной коллекции
    inputList.forEach((inputElement) => {
        // каждому полю добавим обработчик события input
        inputElement.addEventListener('input', () => {
            // Внутри колбэка вызовем isValid,
            // передав ей форму и проверяемый элемент
            isValid(formElement, inputElement, inputErrorClass, errorClass);
            // Вызовем toggleButtonState и передадим ей массив полей и кнопку
            toggleButtonState({ formElement, buttonElement });
        });
    });
};

const enableValidation = ({
                              formSelector,
                              inputSelector,
                              submitButtonSelector,
                              inputErrorClass,
                              errorClass}) => {
    // Найдём все формы с указанным классом в DOM,
    // сделаем из них массив методом Array.from
    const formList = Array.from(document.querySelectorAll(formSelector));
    // Переберём полученную коллекцию
    formList.forEach((formElement) => {
        formElement.addEventListener('submit', (evt) => {
            // У каждой формы отменим стандартное поведение
            evt.preventDefault();
        });

        // Для каждой формы вызовем функцию setEventListeners,
        // передав ей элемент формы
        setEventListeners(formElement, inputSelector, submitButtonSelector, inputErrorClass, errorClass);
    });
};

// Вызовем функцию
enableValidation(validationConfig);
