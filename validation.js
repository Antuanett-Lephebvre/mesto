const validationConfig = {
    formSelector: '.popup__form',
    savedButtonNode: '.button_type_saved',
    inputSelector: '.popup__area',
    buttonInvalidClass: '.button_type_invalid',
    inputInvalidClass: '.popup__area_state_invalid',
}


function showError(form, input, config){
    const error = form.querySelector(`#${input.id}-error`);
    error.textContent = input.validationMessage;
    input.classList.add(config.inputInvalidClass);
}

function hideError(form, input, config){
    const error = form.querySelector(`#${input.id}-error`);
    error.textContent = '';
    input.classList.remove(config.inputInvalidClass);
}

function checkInputValidity(form, input, config){
    if(input.validity.valid) {
        hideError(form, input, config);
    } else {
        showError(form, input, config);
    }
}

function setButtonState(button, isActive, config) {
    if(isActive){
        button.classList.remove(config.buttonInvalidClass);
        button.disabled = false;
    } else {
        button.classList.add(config.buttonInvalidClass);
        button.disabled = 'disabled';
    }
}

function setEventListener(form, config) {
    const inputList = form.querySelectorAll(config.inputSelector);
    const submitButton = form.querySelector(config.savedButtonNode);

    inputList.forEach(input => {
        input.addEventListener('input', () => {
          checkInputValidity(form, input, config);
          setButtonState(submitButton, form.checkValidity(), config)
     })
    })
}

function enableValidation(config){
    const forms = document.querySelectorAll(config.formSelector);
    forms.forEach(form => {
        setEventListener(form, config)

        form.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });

        const submitButton = form.querySelector(config.savedButtonNode);
        setButtonState(submitButton, form.checkValidity(), config)
    });
}

enableValidation(validationConfig);