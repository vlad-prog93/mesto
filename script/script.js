//Функция для открытия попапа
function openPopup() {
  popup.classList.add('popup_opened');
  popup.querySelector('.popup__name').value = nameText.textContent;
  popup.querySelector('.popup__job').value = jobText.textContent;
}


//Функция отправки формы
function formSubmitHandler(evt) {
  evt.preventDefault();
  nameText.textContent = nameInput.value;
  jobText.textContent = jobInput.value;
  popup.classList.remove('popup_opened');
}

let popup = document.querySelector('.popup');
let nameInput = popup.querySelector('.popup__name');
let jobInput = popup.querySelector('.popup__job');

let profile = document.querySelector('.profile')
let nameText = profile.querySelector('.profile__name');
let jobText = profile.querySelector('.profile__job');



//Отправляем форму
//Сохраняем данные и закрываем popup

let formElement = popup.querySelector('.popup__form');

// При помощи "клика" отправить форму и закрыть popup
formElement.addEventListener('submit', formSubmitHandler);

// При помощи "Enter" отправить форму и закрыть popup
window.addEventListener('keyup', function (event) {
  if (event.key === 'Enter') {
    formSubmitHandler(event);
  }
});



//Открываем popup
let openButton = document.querySelector('.profile__edit-button');
openButton.addEventListener('click', openPopup);


//Закрываем попап
let closeButton = popup.querySelector('.popup__close');
closeButton.addEventListener('click', function () {
  popup.classList.remove('popup_opened');
});

//Ставим лайк
for (let likeButton of document.querySelectorAll('.element__like')){
  likeButton.addEventListener('click', function () {
    this.classList.toggle('element__like_active');
});
}







