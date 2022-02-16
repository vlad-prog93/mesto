export default class FormValidator {
  constructor(selectors, formElement) {
    this._selectors = selectors
    this._formElement = formElement;
    this._inputList = Array.from(this._formElement.querySelectorAll(this._selectors.inputSelector));
    this._buttonElement = this._formElement.querySelector(this._selectors.submitButtonSelector);
  }

  enableValidation() {
    this._formElement.addEventListener('submit', (evt) => {
        evt.preventDefault();
      });
    this._setEventListeners();
  }

  enableButton() {
    this._buttonElement.disabled = true;
    this._buttonElement.classList.add(this._selectors.inactiveButtonClass);
  }

  disableButton() {
    this._buttonElement.disabled = false;
    this._buttonElement.classList.remove(this._selectors.inactiveButtonClass);
  }

  resetValidation() {
    this._toggleButtonState();
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
  }

  _setEventListeners() {
    this._inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      this._checkInputValidity(inputElement);
      this._toggleButtonState();
    });
    });
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _showInputError(inputElement) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._selectors.inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.add(this._selectors.errorClass);
  }

  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._selectors.inputErrorClass);
    errorElement.classList.remove(this._selectors.errorClass);
    errorElement.textContent = '';
  }

  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this.enableButton();
    } else {
      this.disableButton();
    }
  };

  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  };
}