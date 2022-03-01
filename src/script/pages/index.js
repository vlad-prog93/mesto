import '../../pages/index.css';

import {
        openButtonEdit, 
        openButtonAdd, 
        openButtonAvatar,
        nameInputEdit, 
        jobInputEdit, 
        formValidators, 
        nameEdit, 
        jobEdit, 
        avatar, 
        infoProfile, 
        infoCards,
        formElementEdit, 
        formElementAdd, 
        formElementAvatar,
        selectors, 
        dataUser
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

let profileId;

//Загрузка информации о пользователе с сервера
const apiProfile = new Api(infoProfile);
apiProfile.getApi()
.then((infoProfile) => {
  nameEdit.textContent = infoProfile.name;
  jobEdit.textContent = infoProfile.about;
  avatar.src = infoProfile.avatar;
  profileId = infoProfile._id;
})

//Загрузка карточек с сервера
const card = new Section({ renderer: (item) => {createCard (item)} }, '.elements');
const apiCards = new Api(infoCards);
apiCards.getApi()
.then(initialCards => card.renderItems(initialCards));

//создание экземпляра для get и set информации профиля
const userInfo = new UserInfo(dataUser);




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
  console.log(popupAdd.getInputValues())
  popupAdd.open();
});

//слушатель кнопки на изменение аватара профиля
openButtonAvatar.addEventListener('click', () => {
  formValidators[ formElementAvatar.getAttribute('name') ].resetValidation();
  popupAvatar.open();
})



//создание попапа добавления карточки
const popupAdd = new PopupWithForm('.popup-add', 'Создать', {submitForm: (evt) => {
  evt.preventDefault();
  popupAdd.renderLoading(true);
  const dataInputs = popupAdd.getInputValues();
  const data = {name: dataInputs.placenamefield, link: dataInputs.placepicfield};
  apiCards.postApi(data)
  .then((res) => {
    createCard(res);
  })
  .finally(() => popupAdd.renderLoading(false))
  popupAdd.close();
}});

//создание попапа редактирования профиля
const popupEdit = new PopupWithForm('.popup-edit', 'Сохранить', {submitForm: (evt) => {
  evt.preventDefault();
  popupEdit.renderLoading(true);
  const dataInputs = popupEdit.getInputValues();
  const data = {name: dataInputs.namefield, job: dataInputs.jobfield};
  apiProfile.patchApi(data)
  .then(res => {
    const data = {name: res.name, job: res.about};
    userInfo.setUserInfo(data);
  })
  .finally(() => popupEdit.renderLoading(false))
  popupEdit.close();
}})

//создание попапа удаления карточки
const popupDeleteCard = new PopupWithAlert('.popup-delete-card', {submitForm: (evt) => {
  evt.preventDefault();
  deleteCard(popupDeleteCard.cardItem);
  popupDeleteCard.close();
}})

//создание попапа редактирования фотографии
const popupAvatar = new PopupWithForm('.popup-avatar', 'Сохранить', {submitForm: (evt) => {
  evt.preventDefault();
  popupAvatar.renderLoading(true);
  const dataInputs = popupAvatar.getInputValues();
  apiProfile.patchAvatarApi(dataInputs.avatarlinkfield)
  .then((res) => {
    userInfo.setUserAvatar(res.avatar);
  })
  .finally(() => popupAvatar.renderLoading(false))
  popupAvatar.close();
}})

//создание попапа открытия карточки
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

//функция создания карточки
function createCard (item) {
  const cardItem = new Card(item, profileId, 'element', { 
    handleCardClick: () => {
      popupImage.open(item);
    },
    handleDeleteCard: () => {
      popupDeleteCard.open(cardItem, item);
    },
    handleLikeCard: (evt) => {
      if (evt.target.classList.contains("element__like_active")) {
        apiCards.deleteLike(item._id)
        .then(res => {
          cardItem.deleteLikeCard();
          cardItem.countLike.textContent = res.likes.length;
        })
      } else {
        apiCards.setLike(item._id)
        .then(res => {
          cardItem.addLikeCard();
          cardItem.countLike.textContent = res.likes.length
        })
      }     
    }
});
  const cardElement = cardItem.generateElement();
  card.addItem(cardElement);
}

//функция удаления карточки
function deleteCard(cardItem) {
  apiCards.deleteCard(cardItem._idCard)
  .then(() => cardItem.deleteCard());
}

//добавляем слушатели на попапы
popupAdd.setEventListeners();
popupEdit.setEventListeners();
popupDeleteCard.setEventListeners();
popupAvatar.setEventListeners();
popupImage.setEventListeners();
