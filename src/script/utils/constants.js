export const popupEdit = document.querySelector('.popup-edit');
export const popupAdd = document.querySelector('.popup-add');

export const openButtonEdit = document.querySelector('.profile__edit-button');
export const openButtonAdd = document.querySelector('.profile__add-button');

export const nameInputEdit = popupEdit.querySelector('.popup-name');
export const jobInputEdit = popupEdit.querySelector('.popup-job');

export const formElementEdit = popupEdit.querySelector('.popup__form');
export const formElementAdd = popupAdd.querySelector('.popup__form');
export const dataUser = {name: '.profile__name', job: '.profile__job'};


// Настройка для форм
export const selectors = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save',
  inactiveButtonClass: 'popup__save_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
};