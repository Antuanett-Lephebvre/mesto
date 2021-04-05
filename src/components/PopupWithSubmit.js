import Popup from "./Popup.js"; 
 
export default class PopupWithSubmit extends Popup { 
    constructor ({popupSelector, handleFormSubmit}) { 
        super(popupSelector); 
        handleFormSubmit = this._handleFormSubmit;
    } 

    setEventListeners() {
        super.setEventListeners();
        this._popup.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._handleFormSubmit();
        });
    }

    setSubmitCallback(callback) {
        this._handleFormSubmit = callback;
    }

}