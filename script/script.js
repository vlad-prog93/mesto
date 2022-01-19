const selectors = {
  cardSelector: '#element',
  nameImageSelector: '.element__photo'
}


const elements = document.querySelector('.elements');

class Card {
	constructor(card, selector) {
		this._name = card.name;
		this._link = card.link;
		this._selector = selector;
    this._cardElement = this._getElement();
	}
	
	_getElement() {
		this._element = document
		.querySelector(`#${this._selector}`)
		.content
		.querySelector(`.${this._selector}`)
		.cloneNode(true);
		return this._element;
	}

  _setEventListeners() {
    this._cardElement.querySelector('.element__like').addEventListener('click', () => {
      this._handleLikeCard();
    });

    this._cardElement.querySelector('.element__delete').addEventListener('click', () => {
      this._handleDeleteCard();
    });

    this._cardElement.querySelector('.element__button-photo').addEventListener('click', () => {
      this._handleOpenPopup();
    });
  }
	
  _handleOpenPopup() {
    this._cardElement.querySelector('.element__button-photo').classList.add('popup_opened');
  }

  _handleClosePopup() {

  }

  _handleLikeCard() {
    this._cardElement.querySelector('.element__like').classList.toggle('element__like_active');
  }

  _handleDeleteCard() {
    this._cardElement.querySelector('.element__delete').closest('article').remove();
  }

	generateElement() {
    this._setEventListeners();
		const photoElement = this._cardElement.querySelector('.element__photo');
		const namePlace = this._cardElement.querySelector('.element__place');
		photoElement.src = this._link;
		photoElement.alt = this._name;
		namePlace.textContent = this._name;
		
    
		document.querySelector('.elements').prepend(this._cardElement);
	}
}

initialCards.forEach((card) => {
	const cardElement = new Card(card, 'element');
	cardElement.generateElement();
})









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
  enableButton(saveButtonAdd, 'popup__save_inactive');
  openPopup(popupAdd);
}


function submitFormAdd(evt) {
  evt.preventDefault();
  addElement(picInputAdd.value, nameInputAdd.value);
  closePopup(popupAdd);
}

function submitFormEdit(evt) {
  evt.preventDefault();
  nameText.textContent = nameInputEdit.value;
  jobText.textContent = jobInputEdit.value;
  closePopup(popupEdit);
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeByEsc);
}

function likeCard() {
  this.classList.toggle('element__like_active');
}

function deleteCard() {
  this.closest('article').remove();
}

function openPreviewImage (link, name) {
  picZoom.src = link;
  picZoom.alt = name;
  picZoomAlt.textContent = name;
  openPopup(popupZoom);
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