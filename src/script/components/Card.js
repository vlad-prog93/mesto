export default class Card {
	constructor(card, selector, {handleCardClick, handleDeleteCard}) {
		this._name = card.name;
		this._link = card.link;
    this._idCard = card._id;
    this._countLikes = card.likes;
    this._ownId = card.owner._id;
    this._selector = selector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteCard = handleDeleteCard;
    //this._deleteCardInfo = deleteCardInfo;
    this._element = this._getTemplate();
    this._elementPhoto = this._element.querySelector('.element__photo');
    this._elementPlace = this._element.querySelector('.element__place');
    this._buttonLike = this._element.querySelector('.element__like');
    
    this._buttonPhoto = this._element.querySelector('.element__button-photo');
    this._likeCount = this._element.querySelector('.element__like-count');

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
    //this._buttonDelete.addEventListener('click', this._deleteCard.bind(this));
    this._buttonPhoto.addEventListener('click', this._handleCardClick.bind(this));
  }

  _handleLikeCard() {
    this._buttonLike.classList.toggle('element__like_active');
  }

  removeCard() {
    this._element.remove();
    this._element = null;
    return this._idCard;
  }

  _checkCardOwn() {
    if (this._ownId == "78e5562678713e56b6e7ed3f") {
      this._element.insertAdjacentHTML('afterbegin', '<button class="element__delete" type="button" aria-label="Удалить"></button>');
      this._buttonDelete = this._element.querySelector('.element__delete');
      this._buttonDelete.addEventListener('click', this._handleDeleteCard.bind(this))
    }
  }

	generateElement() {
    this._setEventListeners();
		this._elementPhoto.src = this._link;
    this._elementPhoto.alt = this._name;
		this._elementPlace.textContent = this._name;
    this._likeCount.textContent = this._countLikes.length;
    this._checkCardOwn();
    return this._element;
	}
}