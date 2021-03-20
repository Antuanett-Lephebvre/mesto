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

    setEventListeners () {
        this._form = this._popup.querySelector('.popup__container');
        this._form.addEventListener('submit', () => {
            this._getInputValues();
            this._handleFormSubmit(this._formValues);
            this.close();
        });
        this._closeProfileButtonNode.addEventListener('click', () => {
            this.close();
        })
        super._setEventListeners();
    }

    open () {
        super.open();
    }

    close () {
        super.close();
    }
}