function showInputError(formElement, inputElement, errorMessage, mas) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

    inputElement.classList.add(mas.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(mas.errorClass);
}

function hideInputError(formElement, inputElement, mas) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

    inputElement.classList.remove(mas.inputErrorClass);
    errorElement.classList.remove(mas.errorClass);
    errorElement.textContent = '';
}

function isValid(formElement, inputElement, mas) {
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage, mas);
    } else {
        hideInputError(formElement, inputElement, mas);
    }
}

function setEventListeners(formElement, mas) {
    const inputList = Array.from(formElement.querySelectorAll(mas.inputSelector));
    const buttonElement = formElement.querySelector(mas.submitButtonSelector);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        isValid(formElement, inputElement, mas);
        toggleButtonState(inputList, buttonElement, mas);
      });
    });
};

function enableValidation(mas) {
    const formList = Array.from(document.querySelectorAll(mas.formSelector));
    formList.forEach((formElement) => {
      formElement.addEventListener('submit', (evt) => {
        evt.preventDefault();
      });
      setEventListeners(formElement, mas);
    });
};

function hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
}; 

function toggleButtonState(inputList, buttonElement, mas) {
    if (hasInvalidInput(inputList)) {
      buttonElement.setAttribute('disabled', true);
      buttonElement.classList.add(mas.inactiveButtonClass);
    } else {
      buttonElement.removeAttribute('disabled');
      buttonElement.classList.remove(mas.inactiveButtonClass);
    }
}; 

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save',
  inactiveButtonClass: 'popup__save_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
});