import Popup from "./src/components/Popup.js";

export default class PopupWithImage extends Popup {
  open(data) {
    this._popup.querySelector(".popup__image").src = data.link;
    this._popup.querySelector(".popup__caption").textContent = data.name;
    super.open();
  }
}
