import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._image = this._popup.querySelector(".modal__preview-image");
    this._title = this._popup.querySelector(".modal__preview-title");
  }

  setContent(name, link) {
    this._image.src = link;
    this._image.alt = name;
    this._title.textContent = name;
  }
}
