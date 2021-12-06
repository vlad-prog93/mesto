let profile = document.querySelector('.profile')
let nameText = profile.querySelector('.profile__name');
let jobText = profile.querySelector('.profile__job');

let popup = document.querySelector('.popup');
let nameInput = popup.querySelector('#name-field');
let jobInput = popup.querySelector('#job-field');
let formElement = popup.querySelector('.popup__form');

let openButton = document.querySelector('.profile__edit-button');

let closeButton = popup.querySelector('.popup__close');


//Функция для открытия popup
function openPopup() {
  popup.classList.add('popup_opened');
  nameInput.value = nameText.textContent;
  jobInput.value = jobText.textContent;
}

// Функция для закрытия popup
function closePopup() {
  popup.classList.remove('popup_opened');
}

//Функция отправки формы
function formSubmitHandler(evt) {
  evt.preventDefault();
  nameText.textContent = nameInput.value;
  jobText.textContent = jobInput.value;
  closePopup();
}



//Открываем popup
openButton.addEventListener('click', openPopup);

//Закрываем popup
closeButton.addEventListener('click', closePopup);

 //При помощи "клика" отправить форму и закрыть popup
formElement.addEventListener('submit', formSubmitHandler);

/**
 При помощи "Enter" отправить форму и закрыть popup
window.addEventListener('keyup', function (event) {
if (event.key === 'Enter') {
formSubmitHandler(event);
}
}); */

/** Ставим лайк
for (let likeButton of document.querySelectorAll('.element__like')){
  likeButton.addEventListener('click', function () {
    this.classList.toggle('element__like_active');
});
} */