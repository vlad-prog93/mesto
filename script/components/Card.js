//import {popupImage, openPopup} from '../utils/utils.js';


export default class Card {
	constructor(card, selector, {handleCardClick}) {
		this._name = card.name;
		this._link = card.link;
    this._handleCardClick = handleCardClick;
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
      this._handleCardClick();
    });

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