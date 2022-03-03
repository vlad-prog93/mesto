import '../../pages/index.css';

import {
        openButtonEdit, 
        openButtonAdd, 
        openButtonAvatar,
        nameInputEdit, 
        jobInputEdit, 
        formValidators, 
        formElementEdit, 
        formElementAdd, 
        formElementAvatar,
        selectors, 
        dataUser,
        dataForApi,
        dataCallApi
      } 
from '../utils/constants.js';

import Card from '../components/Card.js';
import FormValidator from '../components/FormValidation.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';
import PopupWithAlert from '../components/PopupWithAlert.js';


// создание экземпляра API
const api = new Api(dataForApi);

// создание экземпляра отрисовки карточек
const cardSection = new Section({ renderer: (item) => {
  const cardItem = new Card(item, userInfo.id, 'element', { 
    handleCardClick: () => {
      popupImage.open(item);
    },
    handleDeleteCard: () => {
      popupDeleteCard.open(cardItem, item);
    },
    handleLikeCard: () => {
      if (cardItem.checkLike()) {
        api.deleteLike(dataCallApi, item._id)
        .then(res => {
          cardItem.updateLikes(res.likes);
        })
        .catch(err => console.log(`Ошибка ${err}`));
      } else {
        api.setLike(dataCallApi, item._id)
        .then(res => {
          cardItem.updateLikes(res.likes);
        })
        .catch(err => console.log(`Ошибка ${err}`));
      }
    }
});
  return cardItem.generateElement();
} }, '.elements');

//создание экземпляра для get и set информации профиля
const userInfo = new UserInfo(dataUser);

// Загрузка карточек и информации о пользователе с сервера
Promise.all([api.getUserData(dataCallApi), api.getCards(dataCallApi)])
.then(([userData, cards]) => {
  userInfo.setUserInfo(userData);
  cardSection.renderItems(cards);
})
.catch(err => console.log(`Ошибка ${err}`));

//слушатель кнопки на редактирование профиля
openButtonEdit.addEventListener('click', () => {
  const info = userInfo.getUserInfo();
  nameInputEdit.value = info.name;
  jobInputEdit.value = info.job;
  formValidators[ formElementEdit.getAttribute('name') ].resetValidation();
  popupEdit.open();
});

//слушатель кнопки на добавление карточки
openButtonAdd.addEventListener('click', () => {
  formValidators[ formElementAdd.getAttribute('name') ].resetValidation();
  popupAdd.open();
});

//слушатель кнопки на изменение аватара профиля
openButtonAvatar.addEventListener('click', () => {
  formValidators[ formElementAvatar.getAttribute('name') ].resetValidation();
  popupAvatar.open();
})



//создание экземпляра попапа добавления карточки
const popupAdd = new PopupWithForm('.popup-add', 'Создать', {submitForm: (evt) => {
  evt.preventDefault();
  popupAdd.renderLoading(true);
  const dataInputs = popupAdd.getInputValues();
  const data = {name: dataInputs.placenamefield, link: dataInputs.placepicfield};
  api.postCard(dataCallApi, data)
  .then((res) => {
    cardSection.addItem(res)
    popupAdd.close();
  })
  .catch(err => console.log(`Ошибка ${err}`))
  .finally(() => popupAdd.renderLoading(false))
}});

//создание экземпляра попапа редактирования профиля
const popupEdit = new PopupWithForm('.popup-edit', 'Сохранить', {submitForm: (evt) => {
  evt.preventDefault();
  popupEdit.renderLoading(true);
  const dataInputs = popupEdit.getInputValues();
  const data = {name: dataInputs.namefield, about: dataInputs.jobfield};
  api.patchEditProfile(dataCallApi, data)
  .then(res => {
    userInfo.setUserInfo(res);
    popupEdit.close();
  })
  .catch(err => console.log(`Ошибка ${err}`))
  .finally(() => popupEdit.renderLoading(false))
}})

//создание экземпляра попапа удаления карточки
const popupDeleteCard = new PopupWithAlert('.popup-delete-card', {submitForm: (evt) => {
  evt.preventDefault();
  deleteCard(popupDeleteCard.cardItem);
  popupDeleteCard.close();
}})

//создание экземпляра попапа редактирования фотографии
const popupAvatar = new PopupWithForm('.popup-avatar', 'Сохранить', {submitForm: (evt) => {
  evt.preventDefault();
  popupAvatar.renderLoading(true);
  const dataInputs = popupAvatar.getInputValues();
  api.patchAvatarApi(dataCallApi, dataInputs.avatarlinkfield)
  .then((res) => {
    userInfo.setUserInfo(res);
    popupAvatar.close();
  })
  .catch(err => console.log(`Ошибка ${err}`))
  .finally(() => popupAvatar.renderLoading(false))
}})

//создание экземпляра попапа открытия карточки
const popupImage = new PopupWithImage('.popup-picture');

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

//функция удаления карточки
function deleteCard(cardItem) {
  api.deleteCard(dataCallApi, cardItem._idCard)
  .then(() => cardItem.deleteCard())
  .catch(err => console.log(`Ошибка ${err.status}`));
}

//добавляем слушатели на попапы
popupAdd.setEventListeners();
popupEdit.setEventListeners();
popupDeleteCard.setEventListeners();
popupAvatar.setEventListeners();
popupImage.setEventListeners();
