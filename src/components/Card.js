export default class Card {
  constructor(
    data,
    templateSelector,
    handleImageClick,
    handleCardDelete,
    handleDeleteButton,
    handleLikeButton
  ) {
    this._name = data.name;
    this._link = data.link;
    this._id = data._id;
    this._likes = data.likes;
    this._currentUserId = data.currentUserId;
    this._isLiked = data.isLiked || false;
    this._templateSelector = templateSelector;
    this._handleImageClick = handleImageClick;
    this._handleCardDelete = handleCardDelete;
    this._handleDeleteButton = handleDeleteButton;
    this._handleLikeButton = handleLikeButton; ///new DELETE IF CARDS DISAPPEAR
  }

  getId() {
    return this._id;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector(".card")
      .cloneNode(true);

    return cardElement;
  }

  _setEventListeners() {
    this._element
      .querySelector(".card__like-button")
      .addEventListener("click", () => {
        this._handleLikeButton(this);
      });

    this._deleteButton.addEventListener("click", () => {
      this._handleDeleteButton(this);
    });

    this._element
      .querySelector(".card__image")
      .addEventListener("click", () => {
        this._handleImageClick(this._name, this._link);
      });
  }

  _updateLikeStatus() {
    /// NEW NEW NEW
    this._element
      .querySelector(".card__like-button")
      .classList.toggle("card__like-button_active", this._isLiked);
  }

  _handleLikeButton() {
    this._handleLikeButton(this);
  }

  setLikes(isLiked) {
    this._isLiked = isLiked;
    this._updateLikeStatus();
  }

  _handleImageClick() {
    this._handleImageClick(this._name, this._link);
  }

  generateCard() {
    this._element = this._getTemplate();

    this._cardImageEl = this._element.querySelector(".card__image");
    this._cardTitleEl = this._element.querySelector(".card__title");
    this._deleteButton = this._element.querySelector(".card__delete-button");

    this._cardImageEl.src = this._link;
    this._cardImageEl.alt = this._name;
    this._cardTitleEl.textContent = this._name;

    this._element ///
      .querySelector(".card__like-button") ///
      .classList.toggle("card__like-button_active", this._isLiked); ///

    this._setEventListeners();

    return this._element;
  }

  removeCard() {
    this._element.remove();
    this._element = null;
  }
}
