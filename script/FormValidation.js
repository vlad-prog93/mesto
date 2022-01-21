export {toggleModeButton}
import {forms} from './index.js';

function showInputError(formElement, inputElement, errorMessage, selectors) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

    inputElement.classList.add(selectors.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(selectors.errorClass);
}

function hideInputError(formElement, inputElement, selectors) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

    inputElement.classList.remove(selectors.inputErrorClass);
    errorElement.classList.remove(selectors.errorClass);
    errorElement.textContent = '';
}

function checkInputValidity(formElement, inputElement, selectors) {
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage, selectors);
    } else {
        hideInputError(formElement, inputElement, selectors);
    }
}

function setEventListeners(formElement, selectors) {
    const inputList = Array.from(formElement.querySelectorAll(selectors.inputSelector));
    const buttonElement = formElement.querySelector(selectors.submitButtonSelector);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        checkInputValidity(formElement, inputElement, selectors);
        toggleButtonState(inputList, buttonElement, selectors);
      });
    });
};

function enableValidation(selectors) {
    const formList = Array.from(document.querySelectorAll(selectors.formSelector));
    formList.forEach((formElement) => {
      formElement.addEventListener('submit', (evt) => {
        evt.preventDefault();
      });
      setEventListeners(formElement, selectors);
    });
};

function hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
}; 

function toggleButtonState(inputList, buttonElement, selectors) {
    if (hasInvalidInput(inputList)) {
      enableButton(buttonElement, selectors.inactiveButtonClass);
    } else {
      disableButton(buttonElement, selectors.inactiveButtonClass);
    }
};



function enableButton(button, selector) {
    button.disabled = true;
    button.classList.add(selector);
}
function disableButton(button, selector) {
    button.disabled = false;
    button.classList.remove(selector);
}

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save',
  inactiveButtonClass: 'popup__save_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
});

selectors({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save',
  inactiveButtonClass: 'popup__save_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
});

class FormValidation {
  constructor(selectors, form) {
    this._formSelector = selectors.formSelector;
    this._inputSelector = inputSelector;
    this._submitButtonSelector = submitButtonSelector;
    this._inactiveButtonClass = inactiveButtonClass;
    this._inputErrorClass = inputErrorClass;
    this._errorClass = errorClass;
    this._form = form;
  }
  

}


const forms = document.form;
forms.forEach((formItem) => {
  const form = new FormValidator(selectors, formItem);
  form.enableValidation();
}) 