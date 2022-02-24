import PopupWithForm from './PopupWithForm.js';

export default class PopupDeleteCard extends PopupWithForm {
    constructor(selector, { submitForm }) {
        super(selector, { submitForm });
    }

    open(card) {
        super.open();
        this.setEventListenets(card);
    }

    setEventListenets(card) {
      super.setEventListeners();
        this._form.addEventListener('submit', (evt) => {
          this._submitForm(evt, card);
          
        });
    }
}