/*export default class Card {
  constructor(
    data,
    templateSelector,
    handleImageClick,
    handleCardDelete,
    handleDeleteButton
  ) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._handleImageClick = handleImageClick;
    this._handleCardDelete = handleCardDelete;
    this._handleDeleteButton = handleDeleteButton;
    //this._setEventListeners();
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
        this._handleLikeButton();
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

  _handleLikeButton() {
    this._element
      .querySelector(".card__like-button")
      .classList.toggle("card__like-button_active");
  }

  _handleImageClick() {
    this._handleImageClick(this._name, this._link);
  }

  generateCard() {
    this._element = this._getTemplate();

    this._cardImageEl = this._element.querySelector(".card__image");
    this._cardTitleEl = this._element.querySelector(".card__title");
    this._deleteButton = this._element.querySelector(".card__delete-button");
    // select lkike button and replace reference in setEventListeners
    this._cardImageEl.src = this._link;
    this._cardImageEl.alt = this._name;
    this._cardTitleEl.textContent = this._name;
    this._setEventListeners();
    return this._element;
  }
}*/

export default class Card {
  constructor(
    data,
    templateSelector,
    handleImageClick,
    handleCardDelete,
    handleDeleteButton
  ) {
    this._name = data.name;
    this._link = data.link;
    this._id = data._id;
    this._isLiked = data.isLiked || false; // Temp in case I need to change
    this._templateSelector = templateSelector;
    this._handleImageClick = handleImageClick;
    this._handleCardDelete = handleCardDelete;
    this._handleDeleteButton = handleDeleteButton;
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
        this._handleLikeButton();
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

  _handleLikeButton() {
    this._isLiked = !this._isLiked; //// temp code in case need to chang
    this._element
      .querySelector(".card__like-button")
      .classList.toggle("card__like-button_active", this._isLiked); //this._isLiked temp
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
