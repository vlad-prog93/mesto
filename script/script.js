const selectors = {
  cardSelector: '#element',
  nameImageSelector: '.element__photo'
}


const elements = document.querySelector('.elements');

const popupImage = document.querySelector('.popup-picture');
const popupCloseImageButton = popupImage.querySelector('.popup__close');

class Card {
	constructor(card, selector) {
		this._name = card.name;
		this._link = card.link;
		this._selector = selector;
	}
	
	_getTemplate() {
		const cardElement = document
		.querySelector(`#${this._selector}`)
		.content
		.querySelector(`.${this._selector}`)
		.cloneNode(true);

		return cardElement;
	}

  _setEventListeners() {
    this._element.querySelector('.element__like').addEventListener('click', () => {
      this._handleLikeCard();
    });

    this._element.querySelector('.element__delete').addEventListener('click', () => {
      this._handleDeleteCard();
    });

    this._element.querySelector('.element__button-photo').addEventListener('click', () => {
      this._handleOpenPopup();
    });

    popupCloseImageButton.addEventListener('click', () => {
      this._handleClosePopup();
    })
  }
	
  _handleOpenPopup() {
    popupImage.classList.add('popup_opened');
    popupImage.querySelector('.popup__photo').src = this._link;
    popupImage.querySelector('.popup__photo').alt = this._name;
    popupImage.querySelector('.popup__photo-alt').textContent = this._name;
  }

  _handleClosePopup() {
    popupImage.classList.remove('popup_opened');
    popupImage.querySelector('.popup__photo').src = '';
    popupImage.querySelector('.popup__photo').alt = '';
    popupImage.querySelector('.popup__photo-alt').textContent = '';
  }

  _handleLikeCard() {
    this._element.querySelector('.element__like').classList.toggle('element__like_active');
  }

  _handleDeleteCard() {
    this._element.querySelector('.element__delete').closest('article').remove();
  }

	generateElement() {
    this._element = this._getTemplate();
    this._setEventListeners();
		this._element.querySelector('.element__photo').src = this._link;
    this._element.querySelector('.element__photo').alt = this._name;
		this._element.querySelector('.element__place').textContent = this._name;
    
    return this._element;
	}
}

initialCards.forEach((item) => {
	const card = new Card(item, 'element');
	const cardElement = card.generateElement();
  elements.prepend(cardElement);
})


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