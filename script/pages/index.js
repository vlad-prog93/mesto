//export {popupImage};
import {profile, nameText, jobText, 
  popupEdit, popupAll, 
  openButtonEdit, openButtonAdd,
  nameInputEdit, jobInputEdit,
  nameInputAdd, picInputAdd,
  formElementEdit, formElementAdd,
  closeButtons,
  elements, selectors} from '../utils/constants.js';
import Card from '../components/Card.js';
import {initialCards} from '../utils/dataCards.js';
import FormValidator from '../components/FormValidation.js';
import Section from '../components/Section.js';
//import {popupImage, openPopup, closePopup} from '../utils/utils.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';


const cardList = createCard(initialCards);
cardList.renderItems();

openButtonEdit.addEventListener('click', openPopupEdit);
openButtonAdd.addEventListener('click', openPopupAdd);

formElementEdit.addEventListener('submit', submitFormEdit);
//formElementAdd.addEventListener('submit', submitFormAdd);
/*
closeButtons.forEach((closeButton, index) => {
  closeButton.addEventListener('click', () => closePopup(popupAll[index]))
});

popupAll.forEach((popup) => popup.addEventListener('mousedown', closeByMouseDown));
*/
//добавляем валидацию для форм
const formEdit = new FormValidator(selectors, formElementEdit);
formEdit.enableValidation();

const formAdd = new FormValidator(selectors, formElementAdd);
formAdd.enableValidation();

function openPopupAdd() {
  formAdd.enableButton();
  console.log('createcard0');
  const popupAdd = new PopupWithForm('.popup-add', {submitForm: (evt) => {
    console.log('createcard1');
    evt.preventDefault();
    console.log('createcard2');
    const dataInputs = popupAdd._getInputValues();
    createNewCard(dataInputs);
    popupAdd.close();
}});
console.log('createcard3');
  popupAdd.setEventListeners();
  console.log('createcard4');
  popupAdd.open();
}

function openPopupEdit() {
  nameInputEdit.value = nameText.textContent;
  jobInputEdit.value = jobText.textContent;
  openPopup(popupEdit);
}
/*
function openPopupAdd() {
  nameInputAdd.value = '';
  picInputAdd.value = '';
  formAdd.enableButton();
  openPopup(popupAdd);
}
*/
/*
function submitFormAdd(evt) {
  evt.preventDefault();
  createNewCard();
  closePopup(popupAdd);
}
*/
function submitFormEdit(evt) {
  evt.preventDefault();
  nameText.textContent = nameInputEdit.value;
  jobText.textContent = jobInputEdit.value;
  closePopup(popupEdit);
}

function createNewCard(data) {
  const itemsNewCard = [{
    name: data[0],
    link: data[1]
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
/*
function closeByMouseDown(evt) {
  if (evt.target === evt.currentTarget) {
    closePopup(evt.currentTarget);
  }
}
*/