export default class FormValidation{
    constructor(configValidation, formSelector){
        this._config = configValidation;
        this._formEl = document.querySelector(formSelector);
        this._buttonSubmit = this._formEl.querySelector(this._config.savedButtonNode);
        this._inputs = this._formEl.querySelectorAll(this._config.inputSelector);
    };
    
    _showError(input){
        const error = this._formEl.querySelector(`#${input.id}-error`);
        error.textContent = input.validationMessage;
        input.classList.add(this._config.inputInvalidClass);
    }
    
    _hideError(input){
        const error = this._formEl.querySelector(`#${input.id}-error`);
     error.textContent = '';
        input.classList.remove(this._config.inputInvalidClass);
    }

    _checkInputValidity(input){
        if(input.validity.valid) {
            this._hideError(input);
        } else {
            this._showError(input);
        }
    }
    
    setButtonState(isActive) {
        if(isActive){
            this._buttonSubmit.classList.remove(this._config.buttonInvalidClass);
            this._buttonSubmit.disabled = false;
        } else {
            this._buttonSubmit.classList.add(this._config.buttonInvalidClass);
            this._buttonSubmit.disabled = 'disabled';
        }
    }
    
    setEventListener() {
            this._formEl.addEventListener('input', (evt) => {
            const input = evt.target;
              this._checkInputValidity(input);
              this.setButtonState(this._formEl.checkValidity());
         })
        }
    enableValidation(){
        this.setEventListener();
        this._formEl.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });
        this.setButtonState(this._formEl.checkValidity());
    }

    cleanError(input){
        this._input = input;
        this._inputs.forEach(input => {
            this._hideError(input)
        });
     }
 
}