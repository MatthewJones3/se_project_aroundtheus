import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import "../pages/index.css";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import { initialCards, settings } from "../utils/constants.js";
import Api from "../components/api.js";
import PopupWithConfirm from "../components/PopupWithConfirm.js";

const userInfoInstance = new UserInfo({
  nameSelector: ".profile__title",
  jobSelector: ".profile__description",
  avatarSelector: ".profile__image",
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
    renderer: (item) => {
      const card = createCard(item);
      section.addItem(card);
    },
  },
  ".cards__list"
);

const editPicturePopup = new PopupWithForm("#edit-picture-modal", (data) => {
  handleEditPictureFormSubmit(data);
});
editPicturePopup.setEventListeners();

/*const profileEditIcon = document.querySelector(".profile__edit-icon");
profileEditIcon.addEventListener("click", () => {
  editPicturePopup.open();
});*/

//
const profileEditIcon = document.querySelector(".profile__edit-icon");
profileEditIcon.addEventListener("click", () => {
  editPicturePopup.open();
});
//

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

//let cardToDelete = null;
const deleteConfirm = new PopupWithConfirm("#delete-confirmation-modal");
deleteConfirm.setEventListeners();

/*const editPictureFormElement = document.querySelector("#edit-profile-picture");
const editPictureFormValidator = new FormValidator(
  settings,
  editPictureFormElement
);
editPictureFormValidator.enableValidation();*/

//
const editPictureFormElement = document.querySelector("#edit-profile-picture");
const editPictureFormValidator = new FormValidator(
  settings,
  editPictureFormElement
);
editPictureFormValidator.enableValidation();
//

/*function handleEditPictureFormSubmit(data) {
  if (!data || !data.link) {
    console.error(
      "Invalid data provided. Ensure 'data' contains 'link' property."
    );
    return;
  }
  const avatarUrl = data.link.trim();
  if (!avatarUrl) {
    console.error("Avatar URL is missing or empty after trimming.");
    return;
  }
  api
    .updateAvatar(avatarUrl)
    .then((res) => {
      if (res && res.avatar) {
        userInfoInstance.setUserInfo({ avatar: res.avatar });
        editPicturePopup.close();
      } else {
        console.error("Invalid response format from API:", res);
      }
    })
    .catch((err) => {
      console.error(`An error occurred while updating the avatar: ${err}`);
    });
}*/
//
function handleEditPictureFormSubmit(data) {
  if (!data || !data.link) {
    console.error(
      "Invalid data provided. Ensure 'data' contains 'link' property."
    );
    return;
  }
  const avatarUrl = data.link.trim();
  if (!avatarUrl) {
    console.error("Avatar URL is missing or empty after trimming.");
    return;
  }
  api
    .updateAvatar(avatarUrl)
    .then((res) => {
      if (res && res.avatar) {
        userInfoInstance.setUserAvatar(res.avatar);
        editPicturePopup.close();
      } else {
        console.error("Invalid response format from API:", res);
      }
    })
    .catch((err) => {
      console.error(`An error occurred while updating the avatar: ${err}`);
    });
}
//

function openDeleteConfirm(card) {
  if (!card || typeof card.getId !== "function") {
    console.error("Invalid card object passed to openDeleteConfirm", card);
    return;
  }

  console.log("Card ID for deletion:", card.getId());
  deleteConfirm.open();

  deleteConfirm.setSubmitAction(() => {
    api
      .deleteCard(card.getId())
      .then(() => {
        console.log("Card deleted successfully");
        card.removeCard();
        deleteConfirm.close();
      })
      .catch((err) =>
        console.error(`An error occurred when deleting the card: ${err}`)
      );
  });
}
//
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
    handleCardDelete,
    openDeleteConfirm
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
  console.log("Card Data:", cardData);
  api
    .addCard(cardData.name, cardData.link)
    .then((res) => {
      if (res && res.name && res.link) {
        const card = createCard(res);
        section.addItem(card);
        addCardFormElement.reset();
        addCardFormValidator.resetValidation();
        addCardPopup.close();
      } else {
        console.error("Invalid response format from API:", res);
      }
    })
    .catch((err) => {
      console.error(`An error occurred while adding the card: ${err}`);
    });
}

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "3b106730-7f1e-4891-8b91-475561e3309f",
    "Content-Type": "application/json",
  },
});

api.getCards().then((cards) => {
  section.renderItems(cards);
});
