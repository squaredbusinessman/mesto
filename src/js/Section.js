export default class Section {
    constructor({ itemsArray, rendererFunction }, containerSelector) {
        this._initialArray = itemsArray; // Массив данных, которые необходимо отрисовать при инициализации класса
        this._renderer = rendererFunction; // Функция отвечающая за создание и отрисовку данных
        this._container = containerSelector; // Селектор контейнера для добавления созданных элементов
    }

    renderItems() {
        this._initialArray.forEach(item => this._renderer(item));
    }

    addItem(element) {
        this._container.prepend(element);
    }
}
