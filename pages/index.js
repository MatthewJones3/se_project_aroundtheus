import Card from "../components/Card.js"; //The add card form is grey and disabled, so I'm not sure what you mean on the last correction
import FormValidator from "../components/FormValidator.js";

const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

const settings = {
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__submit-button_inactive",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__input-error_active",
};

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

/* Function to handle image click */
function handleImageClick(name, link) {
  previewImageElement.src = link;
  previewImageElement.alt = name;
  previewTitleModalWindow.textContent = name;
  openModal(previewImageModalWindow);
}

/* Event Listeners */
profileEditButton.addEventListener("click", () => {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  openModal(profileEditModal);
});

profileEditCloseButton.addEventListener("click", () => {
  closeModal(profileEditModal);
});

profileEditForm.addEventListener("submit", (e) => {
  e.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closeModal(profileEditModal);
});

addCardFormElement.addEventListener("submit", handleAddCardFormSubmit);

addNewCardButton.addEventListener("click", () => openModal(addCardModal));
addCardModalCloseButton.addEventListener("click", () =>
  closeModal(addCardModal)
);

previewPopupCloseButton.addEventListener("click", () => {
  closeModal(previewImageModalWindow);
});

addNewCardButton.addEventListener("click", () => {
  resetForm(addCardFormElement);
  openModal(addCardModal);
});

/* Initial Rendering of Cards */
initialCards.forEach((cardData) => {
  const card = new Card(cardData, "#card-template", handleImageClick);
  cardListEl.prepend(card.generateCard());
});

function createCard(item) {
  const card = new Card(item, "#card-template", handleImageClick);
  return cardElement.generateCard();
}

initialCards.forEach((cardData) => {
  const card = createCard(cardData);
  cardListEl.prepend(card);
});

/*function createCard(cardData) {
  const card = new Card(cardData, "#card-template", handleImageClick);
  cardListEl.prepend(card.generateCard());
}*/

function handleAddCardFormSubmit(evt) {
  evt.preventDefault();
  const titleValue = cardTitleInput.value.trim();
  const urlValue = cardUrlInput.value.trim();
  if (!titleValue || !urlValue) {
    return;
  }
  const cardData = {
    name: titleValue,
    link: urlValue,
  };
  const card = new Card(cardData, "#card-template", handleImageClick);
  cardListEl.prepend(card.generateCard());
  cardTitleInput.value = "";
  cardUrlInput.value = "";
  const submitButton = addCardFormElement.querySelector(".modal__button");
  //submitButton.setAttribute("disabled", true); commented out not deleted just in case
  //submitButton.classList.add("modal__submit-button_inactive");
  closeModal(addCardModal);
}

function closeModalOnEvent(event) {
  const modals = [profileEditModal, addCardModal, previewImageModalWindow];

  if (event.type === "keydown" && event.key === "Escape") {
    modals.forEach((modal) => closeModal(modal));
  }

  if (event.type === "click") {
    const clickedOutsideModal = modals.find((modal) => event.target === modal);
    if (clickedOutsideModal) {
      closeModal(clickedOutsideModal);
    }
  }
}

function openModal(modal) {
  modal.classList.add("modal_opened");
  window.addEventListener("keydown", closeModalOnEvent);
  document.addEventListener("click", closeModalOnEvent);
}

function closeModal(modal) {
  modal.classList.remove("modal_opened");
  window.removeEventListener("keydown", closeModalOnEvent);
  document.removeEventListener("click", closeModalOnEvent);
}

/*function resetForm(form) {
  form.reset();
  const formValidator = new FormValidator(validationConfig, form);
  formValidator.resetValidation();
}*/
