export {Card};
import {popupImage, openPopup} from './utils.js';


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

  }

  _handleOpenPopup() {
    openPopup(popupImage);
    const image = popupImage.querySelector('.popup__photo');
    image.src = this._link;
    image.alt = this._name;
    popupImage.querySelector('.popup__photo-alt').textContent = this._name;
  }

  _handleLikeCard() {
    this._element.querySelector('.element__like').classList.toggle('element__like_active');
  }

  _handleDeleteCard() {
    this._element.remove();
    this._element = '';
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