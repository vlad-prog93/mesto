export default class PopupWithForm extends Popup {
    constructor(selector, {submitForm}) {
        super(selector);
        this._submitForm = submitForm;
        this._buttonSave = this._popup.querySelector('.popup__save');
        this._nameInputAdd = this._popup.querySelector('.popup-place');
        this._picInputAdd = this._popup.querySelector('.popup-pic');
    }

    _getInputValues() {
        return {name: nameInputAdd.value, link: picInputAdd.value};
    }

    setEventListeners() {
        super.setEventListeners();
        this._buttonSave.addEventListener('click', this._submitForm)
    }

    close() {
        super.close();

    }
}