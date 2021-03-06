const popupEdit = document.querySelector('.popup-edit');
const popupAdd = document.querySelector('.popup-add');
const popupAvatar = document.querySelector('.popup-avatar');

export const openButtonEdit = document.querySelector('.profile__edit-button');
export const openButtonAdd = document.querySelector('.profile__add-button');
export const openButtonAvatar = document.querySelector('.profile__avatar');

export const nameInputEdit = popupEdit.querySelector('.popup-name');
export const jobInputEdit = popupEdit.querySelector('.popup-job');

export const formElementEdit = popupEdit.querySelector('.popup__form');
export const formElementAdd = popupAdd.querySelector('.popup__form');
export const formElementAvatar = popupAvatar.querySelector('.popup__form');

export const dataUser = {name: '.profile__name', job: '.profile__job', avatar: '.profile__avatar'};

export const formValidators = {};

// Настройка для форм
export const selectors = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save',
  inactiveButtonClass: 'popup__save_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
};

export const dataForApi = {
  baseUrl: 'https://nomoreparties.co/v1/cohort36/',
  authorization: '4073624b-bfe3-4826-9ea5-3a6732e5b59a',
  'Content-Type': 'application/json',
}

export const dataCallApi = {
  users: 'users',
  me: 'me',
  cards: 'cards',
  avatar: 'avatar',
  likes: 'likes',
}