/*import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popup.querySelector(".modal__form");
  }

  _getInputValues() {
    const inputs = this._form.querySelectorAll(".modal__input");
    const values = {};
    inputs.forEach((input) => {
      values[input.name] = input.value;
    });
    return values;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      const formData = this._getInputValues(); /// new remove if needed
      this._handleFormSubmit(this._getInputValues());
    });
  }
}*/
/////////////////////////////////
/*import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popup.querySelector(".modal__form");
    this._submitButton = this._form.querySelector(".modal__button");
    this._submitButtonText = this._submitButton.textContent; // Store original text
  }

  _getInputValues() {
    const inputs = this._form.querySelectorAll(".modal__input");
    const values = {};
    inputs.forEach((input) => {
      values[input.name] = input.value;
    });
    return values;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._submitButton.textContent = "Saving..."; // Change button text
      this._submitButton.disabled = true; // Optional: Disable button

      this._handleFormSubmit(this._getInputValues())
        .then(() => {
          this._submitButton.textContent = this._submitButtonText; // Restore original text
          this._form.reset();
          this.close();
        })
        .catch(() => {
          this._submitButton.textContent = this._submitButtonText; // Restore original text
          this._submitButton.disabled = false; // Re-enable button
        });
    });
  }
}*/

import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popup.querySelector(".modal__form");
    this._submitButton = this._form
      ? this._form.querySelector(".modal__submit-button")
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

  setEventListeners() {
    super.setEventListeners();
    if (this._form) {
      this._form.addEventListener("submit", (evt) => {
        evt.preventDefault();
        this._submitButton.textContent = "Saving...";
        this._handleFormSubmit(this._getInputValues()).finally(() => {
          this._submitButton.textContent = "Save";
        });
      });
    }
  }
}
/////// UNCOMMENT ABOVE CODE IF FIXES DONT WORK
