import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popup.querySelector(".modal__form");
    this._submitButton = this._form
      ? this._form.querySelector(".modal__button")
      : null;

    if (!this._form || !this._submitButton) {
      console.error(
        `Form or submit button not found in popup: ${popupSelector}`
      );
    }
  }

  _getInputValues() {
    const inputs = this._form
      ? this._form.querySelectorAll(".modal__input")
      : [];
    const values = {};
    inputs.forEach((input) => {
      values[input.name] = input.value;
    });
    return values;
  }

  /*setButtonContent(message = "saving...") {
    if (this._submitButton) {
      this._submitButton.textContent = message;
    } else {
      console.error("Submit button not found.");
    }
  }*/

  setButtonContent(message = "saving...") {
    this._submitButton.textContent = message;
  }

  setEventListeners() {
    super.setEventListeners();
    if (this._form) {
      this._form.addEventListener("submit", (evt) => {
        evt.preventDefault();
        //this.setButtonContent();
        this._submitButton.textContent = "Saving...";
        this._handleFormSubmit(this._getInputValues()).finally(() => {
          //this.setButtonContent("Save");
          this._submitButton.textContent = "Save";
        });
      });
    }
  }
}
//////// First set of uncommented code does the same as the second
