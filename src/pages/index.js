import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import "../pages/index.css";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import { initialCards, settings } from "../utils/constants.js";

// Initialize instances
const userInfoInstance = new UserInfo({
  nameSelector: ".profile__title",
  jobSelector: ".profile__description",
});

const popupWithImage = new PopupWithImage("#preview-popup");
popupWithImage.setEventListeners();

const profileEditPopup = new PopupWithForm("#profile-edit-modal", (data) => {
  userInfoInstance.setUserInfo(data);
  profileEditPopup.close();
});
profileEditPopup.setEventListeners();

/*const addCardPopup = new PopupWithForm(
  "#add-card-modal",
  handleAddCardFormSubmit
);
addCardPopup.setEventListeners();*/

const addCardPopup = new PopupWithForm("#add-card-modal", (data) => {
  handleAddCardFormSubmit(data);
});
addCardPopup.setEventListeners();

const section = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const card = createCard(item);
      section.addItem(card);
    },
  },
  ".cards__list"
);
section.renderItems();

/* Elements (For my own purposes)*/
const profileEditButton = document.querySelector("#profile-edit-button");
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileEditCloseButton = profileEditModal.querySelector(".modal__close");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);
const profileEditForm = profileEditModal.querySelector(".modal__form");
const cardListEl = document.querySelector(".cards__list");
const addNewCardButton = document.querySelector(".profile__add-button");
const addCardModal = document.querySelector("#add-card-modal");
const addCardModalCloseButton = addCardModal.querySelector(".modal__close");
const addCardFormElement = addCardModal.querySelector(".modal__form");
const cardTitleInput = addCardFormElement.querySelector(
  ".modal__input_type_title"
);
const cardUrlInput = addCardFormElement.querySelector(".modal__input_type_url");
const previewImageModalWindow = document.querySelector("#preview-popup");
const previewImageElement = document.querySelector(".modal__preview-image");
const previewPopupCloseButton =
  previewImageModalWindow.querySelector(".modal__close");
const previewTitleModalWindow = previewImageModalWindow.querySelector(
  ".modal__preview-title"
);

const editFormValidator = new FormValidator(settings, profileEditForm);
editFormValidator.enableValidation();

const addCardFormValidator = new FormValidator(settings, addCardFormElement);
addCardFormValidator.enableValidation();

function handleImageClick(name, link) {
  popupWithImage.setContent(name, link);
  popupWithImage.open();
  //popupWithImage.setContent(name, link);
}

function createCard(item) {
  const card = new Card(item, "#card-template", handleImageClick);
  return card.generateCard();
}

/* Event Listeners */
profileEditButton.addEventListener("click", () => {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  profileEditPopup.open();
});

profileEditCloseButton.addEventListener("click", () => {
  profileEditPopup.close();
});

addNewCardButton.addEventListener("click", () => {
  addCardPopup.open();
});

addCardModalCloseButton.addEventListener("click", () => {
  addCardPopup.close();
});

previewPopupCloseButton.addEventListener("click", () => {
  popupWithImage.close();
});

function handleAddCardFormSubmit(data) {
  if (!data || !data.name || !data.link) {
    console.error("Invalid data provided");
    return;
  }
  const titleValue = data.name.trim();
  const urlValue = data.link.trim();
  if (!titleValue || !urlValue) {
    console.error("Title or URL is missing");
    return;
  }
  const cardData = {
    name: titleValue,
    link: urlValue,
  };
  const card = createCard(cardData);
  cardListEl.prepend(card);
  addCardFormElement.reset();
  addCardFormValidator.resetValidation();
}
