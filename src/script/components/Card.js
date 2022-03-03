export default class Card {
	constructor(card, userInfoId, selector, {handleCardClick, handleDeleteCard, handleLikeCard}) {
		this._name = card.name;
		this._link = card.link;
    this._idCard = card._id;
    this._ownId = card.owner._id;
    this._selector = selector;
    this.countLikeCard = card.likes; // количество лайков карточки на сервере
    this._handleCardClick = handleCardClick;
    this._handleDeleteCard = handleDeleteCard;
    this._handleLikeCard = handleLikeCard;
    this._element = this.getTemplate();
    this._elementPhoto = this._element.querySelector('.element__photo');
    this._elementPlace = this._element.querySelector('.element__place');
    this._buttonLike = this._element.querySelector('.element__like');
    this._buttonDelete = this._element.querySelector('.element__delete');
    this._buttonPhoto = this._element.querySelector('.element__button-photo');
    this.countLike = this._element.querySelector('.element__like-count');
    this._buttonDelete = this._element.querySelector('.element__delete');
    this._profileId = userInfoId;
	}
	
	getTemplate() {
		const cardElement = document
		.querySelector(`#${this._selector}`)
		.content
		.querySelector(`.${this._selector}`)
		.cloneNode(true);
		return cardElement;
	}

  _setEventListeners() {
    this._buttonLike.addEventListener('click', this._handleLikeCard.bind(this));
    this._buttonPhoto.addEventListener('click', this._handleCardClick.bind(this));
  }

  checkLike() {
    if (this._buttonLike.classList.contains("element__like_active")) return true
    return false
  }

  updateLikes(countLikes) {
    this._buttonLike.classList.toggle('element__like_active');
    this.countLike.textContent = countLikes.length;
  }

  deleteCard() {
    this._element.remove();
    this._element = null;
  }

  _checkCardOwn() {
    if (this._ownId == this._profileId) {
      this._buttonDelete.addEventListener('click', this._handleDeleteCard.bind(this))
    } else {
      this._buttonDelete.remove()
    }
  }

  isliked() {
    this.countLikeCard.forEach((likes) => {
      if (this._profileId == likes._id) {
        this.updateLikes(this.countLikeCard)
      }
    })
    this.countLike.textContent = this.countLikeCard.length;
  }

	generateElement() {
    this._setEventListeners();
		this._elementPhoto.src = this._link;
    this._elementPhoto.alt = this._name;
		this._elementPlace.textContent = this._name;
    this.isliked();
    this._checkCardOwn(); // Отображение кнопки delete только на свои карточки
    return this._element;
	}
}