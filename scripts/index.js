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
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;
const addNewCardButton = document.querySelector(".profile__add-button");
const addCardModal = document.querySelector("#add-card-modal");
const addCardModalCloseButton = addCardModal.querySelector(".modal__close");
const addCardFormElement = addCardModal.querySelector(".modal__form");
const cardTitleInput = addCardFormElement.querySelector(
  ".modal__input_type_title"
);
const cardUrlInput = addCardFormElement.querySelector(".modal__input_type_url");
const deleteTemplate =
  document.querySelector("#card-template").content.lastElementChild;
const previewImageModalWindow = document.querySelector("#preview-popup");
const previewImageElement = document.querySelector(".modal__preview-image");
const previewPopupCloseButton =
  previewImageModalWindow.querySelector(".modal__close");

const previewTitleModalWindow = previewImageModalWindow.querySelector(
  ".modal__preview-title"
);

/* Functions */

function closeProfilePopup() {
  closeModal(profileEditModal);
}

function renderCard(cardData) {
  const cardElement = getCardElement(cardData);
  cardListEl.prepend(cardElement);
}

function getCardElement(cardData) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImageEl = cardElement.querySelector(".card__image");
  const cardTitleEl = cardElement.querySelector(".card__title");
  const likeButton = cardElement.querySelector(".card__like-button");
  const deleteButton = cardElement.querySelector(".card__delete-button");

  deleteButton.classList.add("card__delete-button");
  cardElement.appendChild(deleteButton);

  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__like-button_active");
  });

  cardImageEl.addEventListener("click", () => {
    previewImageElement.src = cardData.link;
    previewImageElement.alt = cardData.name;
    previewTitleModalWindow.textContent = cardData.name;
    openModal(previewImageModalWindow);
  });

  deleteButton.addEventListener("click", () => {
    cardElement.remove();
  });

  /*previewPopupCloseButton.addEventListener("click", () => {
    closeModal(previewImageModalWindow);
  });*/

  cardImageEl.alt = cardData.name;
  cardImageEl.src = cardData.link;
  cardTitleEl.textContent = cardData.name;
  return cardElement;
}

function handleAddCardFormSubmit(evt) {
  evt.preventDefault();
  const titleValue = cardTitleInput.value;
  const urlValue = cardUrlInput.value;
  const cardData = {
    name: titleValue,
    link: urlValue,
  };
  const cardElement = getCardElement(cardData);
  cardListEl.prepend(cardElement);
  cardTitleInput.value = "";
  cardUrlInput.value = "";
  closeModal(addCardModal);
}

function openModal(modal) {
  modal.classList.add("modal_opened");
}

function closeModal(modal) {
  modal.classList.remove("modal_opened");
}

/* Event Listeners */
profileEditButton.addEventListener("click", () => {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  profileEditModal.classList.add("modal_opened");
});

addCardFormElement.addEventListener("submit", handleAddCardFormSubmit);

/* on this one, I had help from an experienced friend and im not sure if its what you are looking for, but it seems to work, document removed */
addEventListener("click", (event) => {
  const target = event.target;

  if (target.classList.contains("modal__close")) {
    const modal = target.closest(".modal");

    if (modal) {
      closeModal(modal);
    }
  }
});

profileEditForm.addEventListener("submit", (e) => {
  e.preventDefault();
  profileEditCloseButton.addEventListener("click", closeProfilePopup);
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  /*closeProfilePopup();*/
  closeModal(modal);
});

addNewCardButton.addEventListener("click", () => openModal(addCardModal));
addCardModalCloseButton.addEventListener("click", () =>
  addCardModal.classList.remove("modal_opened")
);

initialCards.forEach((cardData) => {
  const cardElement = getCardElement(cardData);
  cardListEl.prepend(cardElement);
});
