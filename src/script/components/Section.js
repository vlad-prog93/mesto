export default class Section {
    constructor({ renderer }, containerSelector) {
        this._renderer = renderer;
        this._container = document.querySelector(containerSelector);
    }

    addItem(cardElement) {
        this._container.prepend(cardElement);
    }

    renderItems(items) {
        items.reverse().forEach(item => {
            this._renderer(item);
        });
    }
}