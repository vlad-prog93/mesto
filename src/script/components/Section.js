export default class Section {
    constructor({ renderer }, containerSelector) {
        this._renderer = renderer;
        this._container = document.querySelector(containerSelector);
    }

    addItem(cardElement) {
        const card = this._renderer(cardElement);
        this._container.prepend(card);
    }

    renderItems(items) {
        items.reverse().forEach(item => {
            this.addItem(item);
        });
    }
}