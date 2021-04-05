import Popup from "./Popup.js"; 
 
export default class PopupWithForm extends Popup { 
    constructor ({popupSelector, handleFormSubmit}) { 
        super(popupSelector); 
        this._handleFormSubmit = handleFormSubmit; 
        this._closeProfileButtonNode = document.querySelector('.button_closed_profile'); 
        this._submitButton = document.querySelector(this._popupSelector).querySelector('.button_type_saved');
        this._inputList = this._popup.querySelectorAll('.popup__area');
    } 
 
   _getInputValues() {
        this._formValues = {}; 
 
        this._inputList.forEach(input => { 
            this._formValues[input.name] = input.value; 
        }); 
        return this._formValues; 
         
    }
 
    setEventListeners () {
        super.setEventListeners();
        this._form = this._popup.querySelector('.popup__form');
        this._form.addEventListener('submit', () => { 
        this._getInputValues(); 
        this._handleFormSubmit (this._formValues);
        }); 
    } 

    close() {
        this._form.reset(); 
        super.close();
    }

    loadingFunction (bool) {
        if (bool === false) {
                this._submitButton.textContent = "Сохранение..."
        } else {
                this._submitButton.textContent = "Сохранить"
        }
    }
} 