export default class FormValidator {
    constructor({
                    inputSelector,
                    submitButtonSelector,
                    inputErrorClass,
                    errorClass
                }, validateForm) {
        this._inputSelector = inputSelector;
        this._submitButtonSelector = submitButtonSelector;
        this._inputErrorClass = inputErrorClass;
        this._errorClass = errorClass;
        this._validateForm = validateForm;
    }

    _handleDisableSubmit() {
        // обработчик дизейбла кнопки при повторном открытии формы
        this._validateForm
            .querySelector(this._submitButtonSelector)
            .setAttribute('disabled', 'disabled');
    }

    _showInputError(inputElement) {
        // находим элемент ошибки
        const errorElement = this._validateForm.querySelector(`.${inputElement.id}-error`);
        // показываем ошибки
        inputElement.classList.add(this._inputErrorClass);
        errorElement.textContent = inputElement.validationMessage;
        errorElement.classList.add(this._errorClass);
    }

    _hideInputError(inputElement) {
        // Находим элемент ошибки
        const errorElement = this._validateForm.querySelector(`.${inputElement.id}-error`);
        // чистим ошибки
        inputElement.classList.remove(this._inputErrorClass);
        errorElement.classList.remove(this._errorClass);
        errorElement.textContent = '';
    }

    _toggleButtonState() {
        // Если есть хотя бы один невалидный инпут
        if (!this._validateForm.checkValidity()) {
            // сделай кнопку неактивной
            this._validateForm
                .querySelector(this._submitButtonSelector)
                .setAttribute('disabled', 'disabled');
        } else {
            // иначе сделай кнопку активной
            this._validateForm
                .querySelector(this._submitButtonSelector)
                .removeAttribute('disabled');
        }
    }

    _checkInputValidity(inputElement) {
        // метод проверки инпута на валидность
        if (!inputElement.validity.valid) {
            // showInputError теперь получает параметром форму, в которой
            // находится проверяемое поле, и само это поле
            this._showInputError(inputElement);
        } else {
            // hideInputError теперь получает параметром форму, в которой
            // находится проверяемое поле, и само это поле
            this._hideInputError(inputElement);
        }
    }

    _setEventListeners() {
        // Находим все поля внутри формы,
        // сделаем из них массив методом Array.from
        const inputList = Array.from(this._validateForm.querySelectorAll(this._inputSelector));
        // Отключаем сабмит если не валидно
        this._toggleButtonState();
        // Обойдём все элементы полученной коллекции
        inputList.forEach((inputElement) => {
            // каждому полю добавим обработчик события input
            inputElement.addEventListener('input', () => {
                // Внутри колбэка вызовем _checkInputValidity,
                // передав ей проверяемый элемент
                this._checkInputValidity(inputElement)
                // Вызовем toggleButtonState
                this._toggleButtonState();
            });
        });
    }

    prepareForm() {
        // метод подготовки попапа с формой для работы с пользователем
        Array.from(this._validateForm.querySelectorAll(this._inputSelector))
            .forEach((element) => {
                this._hideInputError(element);
        })
        this._validateForm.reset();
        this._handleDisableSubmit();
    }

    enableValidation() {
        // Добавим слушатель на отправку для формы
        this._validateForm.addEventListener('submit', (evt) => {
            // У каждой формы отменим стандартное поведение
            evt.preventDefault();
        });

        // Для формы вызовем функцию setEventListeners,
        // передав ей элемент формы
        this._setEventListeners();
    }
}
