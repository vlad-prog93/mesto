export default class Card {
	constructor(card, selector, {handleCardClick}) {
		this._name = card.name;
		this._link = card.link;
    this._selector = selector;
    this._handleCardClick = handleCardClick;
    this._element = this._getTemplate();
    this._elementPhoto = this._element.querySelector('.element__photo');
    this._elementPlace = this._element.querySelector('.element__place');
    this._buttonLike = this._element.querySelector('.element__like');
    this._buttonDelete = this._element.querySelector('.element__delete');
    this._buttonPhoto = this._element.querySelector('.element__button-photo');

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
    this._buttonLike.addEventListener('click', this._handleLikeCard.bind(this));
    this._buttonDelete.addEventListener('click', this._handleDeleteCard.bind(this));
    this._buttonPhoto.addEventListener('click', this._handleCardClick.bind(this));
  }

  _handleLikeCard() {
    this._buttonLike.classList.toggle('element__like_active');
  }

  _handleDeleteCard() {
    this._element.remove();
    this._element = null;
  }

	generateElement() {
    this._setEventListeners();
		this._elementPhoto.src = this._link;
    this._elementPhoto.alt = this._name;
		this._elementPlace.textContent = this._name;
    return this._element;
	}
}