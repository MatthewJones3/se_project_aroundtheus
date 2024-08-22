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

/* Elements (For my own purposes) */
const profileEditButton = document.querySelector("#profile-edit-button");
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileEditCloseButton = profileEditModal.querySelector(".modal__close");
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

const deleteConfirmationModal = document.querySelector(
  "#delete-confirmation-modal"
);
const deleteConfirmationYes = deleteConfirmationModal.querySelector(
  "#delete-confirmation-yes"
);
const deleteConfirmationNo =
  deleteConfirmationModal.querySelector(".modal__button");

let cardToDelete = null;

/*function openDeleteConfirmationModal(cardElement) {
  cardToDelete = cardElement;
  deleteConfirmationModal.classList.add(".modal_opened");
}*/
//
function openDeleteConfirm(card) {
  deleteConfirm.setSubmitAction(() => {
    api.deleteCard(card._id).then().catch();
  });
  openDeleteConfirm.open();
}
//
function closeDeleteConfirmationModal() {
  deleteConfirmationModal.classList.remove(".modal_opened");
}

deleteConfirmationYes.addEventListener("click", () => {
  if (cardToDelete) {
    cardToDelete.remove(); // Remove the card
  }
  closeDeleteConfirmationModal();
});

deleteConfirmationNo.addEventListener("click", () => {
  closeDeleteConfirmationModal();
});

function handleImageClick(name, link) {
  popupWithImage.open(name, link);
}

function createCard(item) {
  const handleCardDelete = (cardElement) => {
    openDeleteConfirm(cardElement);
  };

  const card = new Card(
    item,
    "#card-template",
    handleImageClick,
    handleCardDelete
  );
  return card.generateCard();
}

profileEditButton.addEventListener("click", () => {
  const userInfo = userInfoInstance.getUserInfo();
  profileTitleInput.value = userInfo.name;
  profileDescriptionInput.value = userInfo.job;
  profileEditPopup.open();
});

addNewCardButton.addEventListener("click", () => {
  addCardPopup.open();
});

function handleAddCardFormSubmit(data) {
  if (!data || !data.name || !data.link) {
    console.error(
      "Invalid data provided. Ensure 'data' contains 'name' and 'link' properties."
    );
    return;
  }
  const titleValue = data.name.trim();
  const urlValue = data.link.trim();
  if (!titleValue || !urlValue) {
    console.error("Title or URL is missing or empty after trimming.");
    return;
  }
  const cardData = {
    name: titleValue,
    link: urlValue,
  };
  const card = createCard(cardData);
  section.addItem(card);
  addCardFormElement.reset();
  addCardFormValidator.resetValidation();
  addCardPopup.close();
}
