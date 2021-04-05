import Popup from "./Popup.js"; 
 
export default class PopupWithImage extends Popup { 
    constructor (popupSelector) { 
        super(popupSelector);
        this._popupPic = this._popup.querySelector('.popup__image'); 
        this._popupText = this._popup.querySelector('.popup__subtitle');
    } 
 
    open (data) {
        this.data = data;
        this._popupPic.src = this.data.link; 
        this._popupText.textContent = this.data.name; 
        super.open(); 
    } 
} 