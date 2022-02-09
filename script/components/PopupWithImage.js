import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
    constructor(selector, {data}) {
        super(selector);
        this._image = this._popup.querySelector('.popup__photo');
        this._figcaptionImage = this._popup.querySelector('.popup__photo-alt');
    }

    open(data) {
        this._image.src = data.link;
        this._image.alt = data.name;
        this._figcaptionImage.textContent = data.name;
        super.open();
    }
}