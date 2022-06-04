export default class Section {
    constructor({ rendererFunction }, containerSelector) {
        this._renderer = rendererFunction; // Функция отвечающая за создание и отрисовку данных
        this._container = containerSelector; // Селектор контейнера для добавления созданных элементов
    }

    renderItems(itemsArray) {
        itemsArray.forEach(item => this._renderer(item));
    }

    addItem({ element, place }) {
        if (place === 'prepend') {
            this._container.prepend(element);
        } else if (place === 'append') {
            this._container.append(element);
        }
    }
}
