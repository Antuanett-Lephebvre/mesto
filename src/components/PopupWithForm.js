import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor ({popupSelector, handleFormSubmit}) {
        super(popupSelector);
        this._handleFormSubmit = handleFormSubmit;
        this._closeProfileButtonNode = document.querySelector('.button_closed_profile');
    }

   _getInputValues() {
        this._inputList = this._popup.querySelectorAll('.popup__area');

        this._formValues = {};

        this._inputList.forEach(input => {
            this._formValues[input.name] = input.value;
        });
        return this._formValues;
        
    }

    eventListeners () {
        this._getInputValues();
        this._handleFormSubmit (this._formValues);
        this.close();
    }

    setEventListeners () {
        this._form = this._popup.querySelector('.popup__container');
        this._form.addEventListener('submit', () => {
            this.eventListeners();
        });
        this._closeProfileButtonNode.addEventListener('click', function () {
            this.close();
        })
        super.setEventListeners();
    }

    open () {
        super.open();

    }


    close () {
        this._form.removeEventListener('submit', () => {
            this.eventListeners();
        });
        this._intutForm = this._form.querySelector('.popup__form').reset();
        super.close();
        this._closeProfileButtonNode.removeEventListener('click', () => {
            this.close();
        })
    }
}