export default class Section {
    constructor({ items, renderer }, containerSelector) {
        this._renderedItems = items;
        this._renderer = renderer;
        this._container = document.querySelector(containerSelector);
    }

    addItem(cardElement) {
        this._container.prepend(cardElement);
    }

    clear() {
        this._container.innerHTML = '';
    }

    renderItems() {
        this._renderedItems.forEach(item => {
            this._renderer(item);
        });
    }
}