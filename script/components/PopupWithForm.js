import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor(selector, { submitForm }) {
        super(selector);
        this._form = this._popup.querySelector('.popup__form')
        this._submitForm = submitForm;
        this._buttonSave = this._form.querySelector('.popup__save');
    }

    _getInputValues() {
        const inputList = Array.from(this._form.querySelectorAll('.popup__input'));
        const data = {};
        inputList.forEach((input) => {
            data[input.name] = input.value
        });
        console.log(data);
        return data;
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', (evt) => this._submitForm(evt));
    }

    close() {
        super.close();
        this._form.reset();
    }
}