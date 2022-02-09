export const profile = document.querySelector('.profile')
export const nameText = profile.querySelector('.profile__name');
export const jobText = profile.querySelector('.profile__job');

export const popupEdit = document.querySelector('.popup-edit');
export const popupAdd = document.querySelector('.popup-add');

export const popupAll = document.querySelectorAll('.popup');

export const openButtonEdit = document.querySelector('.profile__edit-button');
export const openButtonAdd = document.querySelector('.profile__add-button');

export const nameInputEdit = popupEdit.querySelector('.popup-name');
export const jobInputEdit = popupEdit.querySelector('.popup-job');
export const nameInputAdd = popupAdd.querySelector('.popup-place');
export const picInputAdd = popupAdd.querySelector('.popup-pic');

export const formElementEdit = popupEdit.querySelector('.popup__form');
export const formElementAdd = popupAdd.querySelector('.popup__form');

export const closeButtons = document.querySelectorAll('.popup__close');

export const elements = document.querySelector('.elements');





// Настройка для форм
export const selectors = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save',
  inactiveButtonClass: 'popup__save_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
};