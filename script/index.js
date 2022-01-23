export {popupImage};
import {Card} from './Card.js';
import {initialCards} from './dataCards.js';
import {FormValidator } from './FormValidation.js';
import {popupImage, openPopup, closePopup} from './utils.js';

const profile = document.querySelector('.profile')
const nameText = profile.querySelector('.profile__name');
const jobText = profile.querySelector('.profile__job');

const popupEdit = document.querySelector('.popup-edit');
const popupAdd = document.querySelector('.popup-add');

const popupAll = document.querySelectorAll('.popup');

const openButtonEdit = document.querySelector('.profile__edit-button');
const openButtonAdd = document.querySelector('.profile__add-button');

const nameInputEdit = popupEdit.querySelector('.popup-name');
const jobInputEdit = popupEdit.querySelector('.popup-job');
const nameInputAdd = popupAdd.querySelector('.popup-place');
const picInputAdd = popupAdd.querySelector('.popup-pic');

const formElementEdit = popupEdit.querySelector('.popup__form');
const formElementAdd = popupAdd.querySelector('.popup__form');

const closeButtons = document.querySelectorAll('.popup__close');

const elements = document.querySelector('.elements');





// Настройка для форм
const selectors = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save',
  inactiveButtonClass: 'popup__save_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
};


initialCards.forEach((item) => {
	createCard(item);
})


openButtonEdit.addEventListener('click', openPopupEdit);
openButtonAdd.addEventListener('click', openPopupAdd);

formElementEdit.addEventListener('submit', submitFormEdit);
formElementAdd.addEventListener('submit', submitFormAdd);

closeButtons.forEach((closeButton, index) => {
  closeButton.addEventListener('click', () => closePopup(popupAll[index]))
});

popupAll.forEach((popup) => popup.addEventListener('mousedown', closeByMouseDown));

//добавляем валидацию для форм
const formEdit = new FormValidator(selectors, formElementEdit);
formEdit.enableValidation();

const formAdd = new FormValidator(selectors, formElementAdd);
formAdd.enableValidation();



function openPopupEdit() {
  nameInputEdit.value = nameText.textContent;
  jobInputEdit.value = jobText.textContent;
  openPopup(popupEdit);
}

function openPopupAdd() {
  nameInputAdd.value = '';
  picInputAdd.value = '';
  formAdd.enableButton();
  openPopup(popupAdd);
}


function submitFormAdd(evt) {
  evt.preventDefault();
  createNewCard();
  closePopup(popupAdd);
}

function submitFormEdit(evt) {
  evt.preventDefault();
  nameText.textContent = nameInputEdit.value;
  jobText.textContent = jobInputEdit.value;
  closePopup(popupEdit);
}

function createNewCard() {
  const itemsNewCard = {
    name: nameInputAdd.value,
    link: picInputAdd.value
  }
  createCard(itemsNewCard)
}

function createCard(item) {
  const card = new Card(item, 'element');
	const cardElement = card.generateElement();
  elements.prepend(cardElement);
}

function closeByMouseDown(evt) {
  if (evt.target === evt.currentTarget) {
    closePopup(evt.currentTarget);
  }
}