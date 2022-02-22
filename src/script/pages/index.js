import '../../pages/index.css';

import {
        openButtonEdit, openButtonAdd, nameInputEdit, jobInputEdit,
        formValidators, 
        formElementEdit, formElementAdd, selectors, dataUser,
        nameEdit, jobEdit, avatarEdit, optionsCards, optionsProfile
      } 
from '../utils/constants.js';

import Card from '../components/Card.js';
import FormValidator from '../components/FormValidation.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';


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
  card.addItem(createCard(data));
  apiPostCards.setCardApi(data);
  popupAdd.close();
}});
popupAdd.setEventListeners();

//создание попапа редактирования профиля
const popupEdit = new PopupWithForm('.popup-edit', {submitForm: (evt) => {
  evt.preventDefault();
  const dataInputs = popupEdit.getInputValues();
  const data = {name: dataInputs.namefield, job: dataInputs.jobfield};
  userInfo.setUserInfo(data);
  
  apiPatchProfile.setProfileApi(data);
  popupEdit.close();
}})
popupEdit.setEventListeners();

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
  const cardItem = new Card(item, 'element', { handleCardClick: () => {
    popupImage.open(item);
  }});
  return cardItem.generateElement();
}



//загрузка информации о пользователе
const apiGetProfile = new Api(optionsProfile, 'GET', { render: (info) => {
  nameEdit.textContent = info.name;
  jobEdit.textContent = info.about;
  avatarEdit.src = info.avatar;
}} );
apiGetProfile.getApi();

//создание новой карточки
const apiPostCards = new Api (optionsCards, 'POST', { render : null})


// Отправить на сервер информацию о профиле
const apiPatchProfile = new Api (optionsProfile, 'PATCH', { render: null });

//получение карточек
const apiGetCards = new Api(optionsCards, 'GET', { render: (initialCards) => {
  const card = new Section({items: initialCards, 
    renderer: (item) => {
      const cardElement = createCard(item);
      card.addItem(cardElement);
    }}, '.elements');
  card.renderItems();
}});
apiGetCards.getApi();


const card = new Section({items: [], renderer: null}, '.elements');