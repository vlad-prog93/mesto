const profile = document.querySelector('.profile')
const nameText = profile.querySelector('.profile__name');
const jobText = profile.querySelector('.profile__job');

const popupEdit = document.querySelector('.edit_popup');
const popupAdd = document.querySelector('.add_popup');
const popupZoom = document.querySelector('.picture_popup');
const popupAll = document.querySelectorAll('.popup');

const openButtonEdit = document.querySelector('.profile__edit-button');
const openButtonAdd = document.querySelector('.profile__add-button');

const nameInputEdit = popupEdit.querySelector('.name-field_popup');
const jobInputEdit = popupEdit.querySelector('.job-field_popup');
const nameInputAdd = popupAdd.querySelector('.place-field_popup');
const picInputAdd = popupAdd.querySelector('.pic-field_popup');

const picZoom = popupZoom.querySelector('.popup__photo');
const picZoomAlt = popupZoom.querySelector('.popup__photo-alt');

const formElementEdit = popupEdit.querySelector('.popup__form');
const formElementAdd = popupAdd.querySelector('.popup__form');

const closeButtons = document.querySelectorAll('.popup__close');

const elementTemplate = document.querySelector('#element').content;
const elements = document.querySelector('.elements');


initialCards.forEach((inCards) => addElement(inCards.link, inCards.name))


openButtonEdit.addEventListener('click', openPopupEdit);
openButtonAdd.addEventListener('click', openPopupAdd);

formElementEdit.addEventListener('submit', formSubmitHandlerEdit);
formElementAdd.addEventListener('submit', formSubmitHandlerAdd);

closeButtons.forEach(function hi(closeButton, index) {
  closeButton.addEventListener('click', () => closePopup(popupAll[index]))
});


function addElement (picture, namePicture) {
  const element = elementTemplate.querySelector('.element').cloneNode(true);
  const elementPhoto = element.querySelector('.element__photo');
  elementPhoto.src = picture;
  elementPhoto.alt = namePicture;
  element.querySelector('.element__place').textContent = namePicture;
  element.querySelector('.element__like').addEventListener('click', likeCard);
  element.querySelector('.element__delete').addEventListener('click', deleteCard);
  element.querySelector('.element__button-photo').addEventListener('click', () => openPreviewImage(picture, namePicture));
  elements.prepend(element);
}

function openPopup(popup) {
  popup.classList.add('popup_opened')
}

function openPopupEdit() {
  nameInputEdit.value = nameText.textContent;
  jobInputEdit.value = jobText.textContent;
  openPopup(popupEdit);
}

function openPopupAdd() {
  nameInputAdd.value = '';
  picInputAdd.value = '';
  nameInputAdd.placeholder= 'Название';
  picInputAdd.placeholder = 'Ссылка на картинку';
  openPopup(popupAdd);
  }


function formSubmitHandlerAdd(evt) {
  evt.preventDefault();
  addElement (picInputAdd.value, nameInputAdd.value);
  closePopup(popupEdit);
}

function formSubmitHandlerEdit(evt) {
  evt.preventDefault();
  nameText.textContent = nameInputEdit.value;
  jobText.textContent = jobInputEdit.value;
  closePopup(popupAdd);
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

function likeCard() {
  this.classList.toggle('element__like_active');
};

function deleteCard() {
  this.closest('article').remove();
}

function openPreviewImage (link, name) {
  picZoom.src = link;
  picZoom.alt = name;
  picZoomAlt.textContent = name;
  openPopup(popupZoom);
  
}

/**
 При помощи "Enter" отправить форму и закрыть popup
window.addEventListener('keyup', function (event) {
if (event.key === 'Enter') {
formSubmitHandler(event);
}
}); */