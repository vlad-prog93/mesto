export {popupImage, forms};
import {Card} from './Card.js';
import {toggleModeButton} from './FormValidation.js';

const forms = document.forms;
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
const saveButtonAdd = popupAdd.querySelector('.popup__save');

const elements = document.querySelector('.elements');

const popupImage = document.querySelector('.popup-picture');

const initialCards = [
  {
    name: 'Карачаевск',
    link: './images/element/karachaevsk.jpg'
  },
  {
    name: 'Домбай',
    link: './images/element/dombai.jpg'
  },
  {
    name: 'Эльбрус',
    link: './images/element/elbrus.jpg'
  },
  {
    name: 'Карачаево-Черкесская республика',
    link: './images/element/kchr.jpeg'
  },
  {
    name: 'Дагестан',
    link: './images/element/dagestan.jpg'
  },
  {
    name: 'Кабардино-Балкарская Республика',
    link: './images/element/kbr.jpg'
  }
];


initialCards.forEach((item) => {
	const card = new Card(item, 'element');
	const cardElement = card.generateElement();
  elements.prepend(cardElement);
})


openButtonEdit.addEventListener('click', openPopupEdit);
openButtonAdd.addEventListener('click', openPopupAdd);

formElementEdit.addEventListener('submit', submitFormEdit);
formElementAdd.addEventListener('submit', submitFormAdd);

closeButtons.forEach((closeButton, index) => {
  closeButton.addEventListener('click', () => closePopup(popupAll[index]))
});

popupAll.forEach((popup) => popup.addEventListener('mousedown', closeByMouseDown));

function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closeByEsc);
}

function openPopupEdit() {
  nameInputEdit.value = nameText.textContent;
  jobInputEdit.value = jobText.textContent;
  openPopup(popupEdit);
}

function openPopupAdd() {
  nameInputAdd.value = '';
  picInputAdd.value = '';
  toggleModeButton(saveButtonAdd, true, 'popup__save_inactive');
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
  const card = new Card(itemsNewCard, 'element');
	const cardElement = card.generateElement();
  elements.prepend(cardElement);
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeByEsc);
}

function closeByMouseDown(evt) {
  if (evt.target === evt.currentTarget) {
    closePopup(evt.currentTarget);
  }
}

function closeByEsc(evt) {
  if (evt.key === 'Escape') {
    const popupOpened = document.querySelector('.popup_opened');
    closePopup(popupOpened);
  }
}