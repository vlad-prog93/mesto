import Popup from "./Popup.js";

export default class PopupWithAlert extends Popup {
    constructor(selector, { submitForm }) {
        super(selector);
        this._submitForm = submitForm;
        this._form = this._popup.querySelector('.popup__form')
    }

    open(cardItem, data) {
        super.open();
        this.cardItem = cardItem;
        this.dataCard = data;
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', (evt) => {this._submitForm(evt)});
    }
    
}

