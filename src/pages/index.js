import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import "../pages/index.css";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import { settings } from "../utils/constants.js";
import Api from "../components/Api.js";
import PopupWithConfirm from "../components/PopupWithConfirm.js";

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "3b106730-7f1e-4891-8b91-475561e3309f",
    "Content-Type": "application/json",
  },
});

const userInfoInstance = new UserInfo({
  nameSelector: ".profile__title",
  jobSelector: ".profile__description",
  avatarSelector: ".profile__image",
});

const popupWithImage = new PopupWithImage("#preview-popup");
popupWithImage.setEventListeners();

const profileEditPopup = new PopupWithForm("#profile-edit-modal", (data) => {
  if (!data || !data.name || !data.job) {
    console.error(
      "Invalid data provided. Ensure 'data' contains 'name' and 'job' properties."
    );
    return Promise.resolve(); //// Promise.resolve delete if doesnt help
  }
  profileEditPopup.setButtonContent();
  api
    .updateUserInfo(data.name, data.job)
    .then((res) => {
      if (res && res.name && res.about) {
        userInfoInstance.setUserInfo({
          name: res.name,
          job: res.about,
        });
        profileEditPopup.close();
      } else {
        console.error("Invalid response format from API:", res);
      }
    })
    .catch((err) => {
      console.error(`An error occurred while updating the user info: ${err}`);
    })
    .finally(() => {
      profileEditPopup.setButtonContent("Save");
    });
});
profileEditPopup.setEventListeners();

const addCardPopup = new PopupWithForm("#add-card-modal", (data) => {
  handleAddCardFormSubmit(data);
});
addCardPopup.setEventListeners();

const editPicturePopup = new PopupWithForm("#edit-picture-modal", (data) => {
  handleEditPictureFormSubmit(data);
});
editPicturePopup.setEventListeners();

const deleteConfirm = new PopupWithConfirm("#delete-confirmation-modal");
deleteConfirm.setEventListeners();

document
  .querySelector("#profile-edit-picture-button")
  .addEventListener("click", () => {
    editPicturePopup.open();
  });

const section = new Section(
  {
    renderer: (item) => {
      const card = createCard(item);
      section.addItem(card);
    },
  },
  ".cards__list"
);

const profileEditForm = document.querySelector(
  "#profile-edit-modal .modal__form"
);
const addCardForm = document.querySelector("#add-card-modal .modal__form");
const editPictureForm = document.querySelector(
  "#edit-picture-modal .modal__form"
);

const profileEditFormValidator = new FormValidator(settings, profileEditForm);
profileEditFormValidator.enableValidation();

const addCardFormValidator = new FormValidator(settings, addCardForm);
addCardFormValidator.enableValidation();

const editPictureFormValidator = new FormValidator(settings, editPictureForm);
editPictureFormValidator.enableValidation();

document.querySelector("#profile-edit-button").addEventListener("click", () => {
  const userInfo = userInfoInstance.getUserInfo();
  document.querySelector("#profile-title-input").value = userInfo.name;
  document.querySelector("#profile-description-input").value = userInfo.job;
  profileEditPopup.open();
});

document.querySelector(".profile__add-button").addEventListener("click", () => {
  addCardPopup.open();
});

function handleAddCardFormSubmit(data) {
  if (!data || !data.name || !data.link) {
    console.error(
      "Invalid data provided. Ensure 'data' contains 'name' and 'link' properties."
    );
    return Promise.resolve(); /// promise reseolve delete if doesnt help
  }

  const cardData = {
    name: data.name.trim(),
    link: data.link.trim(),
  };
  addCardPopup.setButtonContent();
  api
    .addCard(cardData.name, cardData.link)
    .then((res) => {
      if (res && res.name && res.link) {
        const card = createCard(res);
        section.addItem(card);
        document.querySelector("#add-card-modal .modal__form").reset();
        addCardFormValidator.resetValidation();
        addCardPopup.close();
      } else {
        console.error("Invalid response format from API:", res);
      }
    })
    .catch((err) => {
      console.error(`An error occurred while adding the card: ${err}`);
    })
    .finally(() => {
      addCardPopup.setButtonContent("Create");
    });
}

function handleEditPictureFormSubmit(data) {
  if (!data || !data.link) {
    console.error(
      "Invalid data provided. Ensure 'data' contains 'link' property."
    );
    return Promise.resolve(); /// promise resolve delete if doesnt work
  }

  const avatarUrl = data.link.trim();
  if (!avatarUrl) {
    console.error("Avatar URL is missing or empty after trimming.");
    return;
  }
  editPicturePopup.setButtonContent();
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
    })
    .finally(() => {
      editPicturePopup.setButtonContent("Save");
    });
}

function openDeleteConfirm(card) {
  if (!card || typeof card.getId !== "function") {
    console.error("Invalid card object passed to openDeleteConfirm", card);
    return;
  }

  deleteConfirm.open();

  deleteConfirm.setSubmitAction(() => {
    api
      .deleteCard(card.getId())
      .then(() => {
        card.removeCard();
        deleteConfirm.close();
      })
      .catch((err) => {
        console.error(`An error occurred when deleting the card: ${err}`);
      });
  });
}

function handleImageClick(name, link) {
  popupWithImage.open(name, link);
}

function createCard(item) {
  const handleCardDelete = (cardElement) => {
    openDeleteConfirm(cardElement);
  };

  const currentUserId = userInfoInstance.getUserInfo()._id;

  const card = new Card(
    { ...item, currentUserId },
    "#card-template",
    handleImageClick,
    handleCardDelete,
    openDeleteConfirm,
    handleCardLike
  );
  return card.generateCard();
}

api
  .getUserInfoAndCards()
  .then(([userInfo, cards]) => {
    userInfoInstance.setUserInfo({
      name: userInfo.name,
      job: userInfo.about,
    });
    userInfoInstance.setUserAvatar(userInfo.avatar);
    section.renderItems(cards);
  })
  .catch((err) => {
    console.error(`Error fetching user info and cards: ${err}`);
  });

function handleCardLike(card) {
  const method = card._isLiked ? "dislikeCard" : "likeCard";

  api[method](card.getId())
    .then((res) => {
      console.log("API response:", res);
      card.setLikes(res.isLiked);
    })
    .catch((err) => {
      console.error(`An error occurred while liking the card: ${err}`);
    });
}
