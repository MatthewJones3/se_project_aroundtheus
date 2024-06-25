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
const previewImageElement = document.querySelector(".popup__preview-image");

/* Functions */
function closePopup() {
  profileEditModal.classList.remove("modal_opened");
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closeModal(editProfileModal);
}

function handleAddCardFormSubmit(evt) {
  evt.preventDefault();
  const titleValue = cardTitleInput.value;
  const urlValue = cardUrlInput.value;
  const cardElement = getCardElement();
  closeModal(addCardModal);
}

function generateCard(cardData) {
  const cardElement = cardTemplate.cloneNode(true);
  cardElement.querySelector(".card__title").textContent = cardData.name;
  const imageEl = cardElement.querySelector(".card__image");
  imageEl.style.backgroundImage = url($(cardData.link));
  imageEl.addEventListener("click", function () {
    previewImageElement.src = cardData.link;
    toggle(previewImageModalWindow);
  });
  return cardElement;
}

function getCardElement(cardData) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImageEl = cardElement.querySelector(".card__image");
  const cardTitleEl = cardElement.querySelector(".card__title");
  const likeButton = cardElement.querySelector(".card__like-button");
  const deleteButton = document.createElement("button");

  deleteButton.classList.add("card__delete-button");
  cardElement.appendChild(deleteButton);

  deleteButton.addEventListener("click", () => {
    cardElement.remove();
  });

  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__like-button_active");
  });

  cardImageEl.alt = cardData.name;
  cardImageEl.src = cardData.link;
  cardTitleEl.textContent = cardData.name;
  return cardElement;
}

function openModal(modal) {
  modal.classList.add("modal_opened");
  modal.style.opacity = 0;
  let opacity = 0;
  const animationFrame = () => {
    opacity += 0.1;
    modal.style.opacity = opacity;
    if (opacity < 1) {
      requestAnimationFrame(animationFrame);
    }
  };
  requestAnimationFrame(animationFrame);
}

function closeModal(modal) {
  modal.classList.remove("modal_opened");
  modal.style.opacity = 1;
  let opacity = 1;
  const animationFrame = () => {
    opacity -= 0.1;
    modal.style.opacity = opacity;
    if (opacity > 0) {
      requestAnimationFrame(animationFrame);
    }
  };
  requestAnimationFrame(animationFrame);
}
/* Event Listeners */
profileEditButton.addEventListener("click", () => {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  profileEditModal.classList.add("modal_opened");
});

addCardFormElement.addEventListener("submit", handleAddCardFormSubmit);

profileEditCloseButton.addEventListener("click", closePopup);

profileEditForm.addEventListener("submit", (e) => {
  e.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closePopup();
});

addNewCardButton.addEventListener("click", () => openModal(addCardModal));
addCardModalCloseButton.addEventListener("click", () =>
  addCardModal.classList.remove("modal_opened")
);

initialCards.forEach((cardData) => {
  const cardElement = getCardElement(cardData);
  cardListEl.prepend(cardElement);
});

/*deleteButton.addEventListener("click", () => {
  cardElement.remove();
}); */

//find delete button
// add event listener to button
// call cardElement.remove
//same way with the like button

//add click listener to cardImage
//open modal with "previewImageModal"
