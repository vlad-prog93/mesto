import '../../pages/index.css';

import {
        openButtonEdit, openButtonAdd, nameInputEdit, jobInputEdit,
        formValidators, nameEdit, jobEdit, avatar, 
        formElementEdit, formElementAdd, selectors, dataUser
      } 
from '../utils/constants.js';

import Card from '../components/Card.js';
//import {initialCards} from '../utils/dataCards.js';
import FormValidator from '../components/FormValidation.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';

//Загрузка информации о пользователе с сервера
const infoProfile = {
  baseUrl: 'https://nomoreparties.co/v1/cohort36/users/me',
  authorization: '4073624b-bfe3-4826-9ea5-3a6732e5b59a',
}
const apiProfile = new Api(infoProfile);
apiProfile.getApi().then((infoProfile) => {
  nameEdit.textContent = infoProfile.name;
  jobEdit.textContent = infoProfile.about;
  avatar.src = infoProfile.avatar;
})

//Загрузка карточек с сервера
const infoCards = {
  baseUrl: 'https://nomoreparties.co/v1/cohort36/cards',
  authorization: '4073624b-bfe3-4826-9ea5-3a6732e5b59a', 
}
const card = new Section({ renderer: (item) => {createCard (item)} }, '.elements');
const apiCards = new Api(infoCards);
apiCards.getApi().then((initialCards) => card.renderItems(initialCards));







//создание класса для get и set информации профиля
const userInfo = new UserInfo(dataUser);

//слушатель кнопки на редактирование профиля
openButtonEdit.addEventListener('click', () => {
  formValidators[ formElementEdit.getAttribute('name') ].resetValidation();
  const info = userInfo.getUserInfo();
  nameInputEdit.value = info.name;
  jobInputEdit.value = info.job;
  popupEdit.open();
});

//слушатель кнопки на добавление карточки
openButtonAdd.addEventListener('click', () => {
  formValidators[ formElementAdd.getAttribute('name') ].resetValidation();
  popupAdd.open();
});

//создание попапа добавления карточки
const popupAdd = new PopupWithForm('.popup-add', {submitForm: (evt) => {
  evt.preventDefault();
  const dataInputs = popupAdd.getInputValues();
  const data = {name: dataInputs.placenamefield, link: dataInputs.placepicfield};
  createCard(data);
  apiCards.postApi(data); // Добавление новой карточки
  popupAdd.close();
}});
popupAdd.setEventListeners();


//создание попапа редактирования профиля
const popupEdit = new PopupWithForm('.popup-edit', {submitForm: (evt) => {
  evt.preventDefault();
  const dataInputs = popupEdit.getInputValues();
  const data = {name: dataInputs.namefield, job: dataInputs.jobfield};
  userInfo.setUserInfo(data);
  apiProfile.patchApi(data); // Редактирование профиля
  popupEdit.close();
}})
popupEdit.setEventListeners();

//создание попапа редактирования профиля
const popupDeleteCard = new PopupWithForm('.popup-delete-card', {submitForm: (evt) => {
  evt.preventDefault();
  console.log('hi');
  console.log(evt.target)
  popupDeleteCard.close();
}})
popupDeleteCard.setEventListeners();

//создание попапа открытия карточки
const popupImage = new PopupWithImage('.popup-picture');
popupImage.setEventListeners();

//добавляем валидацию для форм
function enableValidation(selectors) {
  const formList = Array.from(document.querySelectorAll(selectors.formSelector));
  formList.forEach((formElement) => {
    const validator = new FormValidator(selectors, formElement);
    const formName = formElement.name;
    formValidators[formName] = validator;
    validator.enableValidation();
  });
};
enableValidation(selectors);

//функция создание карточки
function createCard (item) {
  const cardItem = new Card(item, 'element', { 
    handleCardClick: () => {
      popupImage.open(item);
    },
    handleDeleteCard: () => {
      popupDeleteCard.open();
    }
}
  );
  const cardElement = cardItem.generateElement();
  card.addItem(cardElement);
}

