import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
    constructor (popupSelector) {
        super(popupSelector);
    }

    open (Data) {
        this.Data = Data;
        this._popupPic = document.querySelector('.popup__image');
        this._popupText = document.querySelector('.popup__subtitle');
        this._popupPic.src = this.Data.link;
        this._popupText.textContent = this.Data.name;
        super.open();
        super.setEventListeners();
    }
}