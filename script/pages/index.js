//export {popupImage};
import {
        openButtonEdit, openButtonAdd, nameInputEdit, jobInputEdit,
        formElementEdit, formElementAdd, selectors 
      } 
from '../utils/constants.js';

import Card from '../components/Card.js';
import {initialCards} from '../utils/dataCards.js';
import FormValidator from '../components/FormValidation.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';


//создание карточек
const cardList = createCard(initialCards);
cardList.renderItems();

//слушатель кнопки на изменение профиля
openButtonEdit.addEventListener('click', () => {
  const info = userInfo.getUserInfo();
  nameInputEdit.value = info.name;
  jobInputEdit.value = info.job;
  popupEdit.open();
});

//слушатель кнопки на добавление карточки
openButtonAdd.addEventListener('click', () => {
  formAdd.enableButton();
  popupAdd.open();
});

//создание попапа редактирования профиля
const popupEdit = new PopupWithForm('.popup-edit', {submitForm: (evt) => {
  evt.preventDefault();
  const dataInputs = popupEdit._getInputValues();
  const data = {name: dataInputs.namefield, job: dataInputs.jobfield};
  console.log(data);
  userInfo.setUserInfo(data);
  popupEdit.close();
}})
popupEdit.setEventListeners();

const popupAdd = new PopupWithForm('.popup-add', {submitForm: (evt) => {
  evt.preventDefault();
  const dataInputs = popupAdd._getInputValues();
  createNewCard(dataInputs);
  popupAdd.close();
}});
popupAdd.setEventListeners();



//добавляем валидацию для форм
const formEdit = new FormValidator(selectors, formElementEdit);
formEdit.enableValidation();

const formAdd = new FormValidator(selectors, formElementAdd);
formAdd.enableValidation();



const dataUser = {name: '.profile__name', job: '.profile__job'};
const userInfo = new UserInfo(dataUser);

function createNewCard(data) {
  const itemsNewCard = [{
    name: data.placenamefield,
    link: data.placepicfield
  }]
  const newCard = createCard(itemsNewCard);
  newCard.renderItems();
}

function createCard(itemsNewCard) {
  const card = new Section({items: itemsNewCard, 
    renderer: (item) => {
      const cardItem = new Card(item, 'element', { handleCardClick: () => {
        const popupImage = new PopupWithImage('.popup-picture', item);
        popupImage.open(item);
        popupImage.setEventListeners();
      } });
      const cardElement = cardItem.generateElement();
      card.addItem(cardElement);
    }
  }, '.elements');
  return card;
}