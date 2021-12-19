const profile = document.querySelector('.profile')
const nameText = profile.querySelector('.profile__name');
const jobText = profile.querySelector('.profile__job');

const popupEdit = document.querySelectorAll('.popup')[0];
const popupAdd = document.querySelectorAll('.popup')[1];
const popupZoom = document.querySelectorAll('.popup')[2];

const openButtonEdit = document.querySelector('.profile__edit-button');
const openButtonAdd = document.querySelector('.profile__add-button');

const nameInputEdit = popupEdit.querySelector('#name-field');
const jobInputEdit = popupEdit.querySelector('#job-field');
const nameInputAdd = popupAdd.querySelector('#place-field');
const picInputAdd = popupAdd.querySelector('#pic-field');
const picZoom = popupZoom.querySelector('.popup__photo');
const picZoomAlt = popupZoom.querySelector('.popup__photo-alt');

const formElement = document.querySelectorAll('.popup__form');
const closeButton = document.querySelectorAll('.popup__close');


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

initialCards.forEach((inCards) => addElement(inCards.link, inCards.name))


openButtonEdit.addEventListener('click', openPopupEdit);
openButtonAdd.addEventListener('click', openPopupAdd);

formElement.forEach((forEl) => forEl.addEventListener('submit', formSubmitHandler));
closeButton.forEach((clBut) => clBut.addEventListener('click', closePopup));



function addElement (picture, namepicture) {
  let elements, element, elementTemplate;
  elementTemplate = document.querySelector('#element').content;
  elements = document.querySelector('.elements');
  element = elementTemplate.querySelector('.element').cloneNode(true);
  element.querySelector('.element__photo').src = picture;
  element.querySelector('.element__photo').alt = namepicture;
  element.querySelector('.element__place').textContent = namepicture;
  element.querySelector('.element__like').addEventListener('click', likeButton);
  element.querySelector('.element__delete').addEventListener('click', delButton);
  element.querySelector('.element__button-photo').addEventListener('click', ZoomButton);
  elements.prepend(element);
}



function openPopupEdit() {
  nameInputEdit.value = nameText.textContent;
  jobInputEdit.value = jobText.textContent;
  popupEdit.classList.add('popup_opened');
}

function openPopupAdd() {
  nameInputAdd.value = '';
  picInputAdd.value = '';
  nameInputAdd.placeholder= 'Название';
  picInputAdd.placeholder = 'Ссылка на картинку';
  popupAdd.classList.add('popup_opened');
  }



function formSubmitHandler(evt) {
  evt.preventDefault();
  if (popupAdd.classList.contains('popup_opened')) {
    addElement (picInputAdd.value, nameInputAdd.value);
    closePopup();
  } else if (popupEdit.classList.contains('popup_opened')) {
    nameText.textContent = nameInputEdit.value;
    jobText.textContent = jobInputEdit.value;
    closePopup();
  } else {
    closePopup();
  }
}

function closePopup() {
  if (popupEdit.classList.contains('popup_opened')) {
    popupEdit.classList.remove('popup_opened');
  } else if (popupAdd.classList.contains('popup_opened')) {
    popupAdd.classList.remove('popup_opened');
  } else if (popupZoom.classList.contains('popup_opened')) {
    popupZoom.classList.remove('popup_opened');
  }
}



function likeButton() {
  this.classList.toggle('element__like_active');
};

function delButton() {
  this.closest('article').remove();
}

function ZoomButton () {
  let picture = this.firstElementChild
  popupZoom.classList.add('popup_opened');
  picZoom.src = picture.src;
  picZoom.alt = picture.alt;
  picZoomAlt.textContent = picture.alt;
}

/**
 При помощи "Enter" отправить форму и закрыть popup
window.addEventListener('keyup', function (event) {
if (event.key === 'Enter') {
formSubmitHandler(event);
}
}); */