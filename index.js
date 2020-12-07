let editButtonNode = document.querySelector('.button_type_edit');
let popupNode = document.querySelector('.popup');
let closeButtonNode = document.querySelector('.button_type_closed');
let infoTitleNode = document.querySelector('.profile__title');
let infoSubtitleNode = document.querySelector('.profile__subtitle');
let formNode = document.querySelector('.popup__form');
let formInputNameNode = document.querySelector('.popup__area_type_name');
let formInputAboutNode = document.querySelector('.popup__area_type_about');


function handleEditButtonClick() {
    formInputNameNode.value = infoTitleNode.textContent;
    formInputAboutNode.value = infoSubtitleNode.textContent;
    popupNode.classList.add('popup_opened');
}

function handleAddButtonClick() {
    popupNode.classList.remove('popup_opened');
}

function handleFormSubmit(event) {
    event.preventDefault();
    infoTitleNode.textContent = formInputNameNode.value;
    infoSubtitleNode.textContent = formInputAboutNode.value;
}

editButtonNode.addEventListener('click', handleEditButtonClick);

closeButtonNode.addEventListener('click', handleAddButtonClick);

formNode.addEventListener('submit', handleFormSubmit);
formNode.addEventListener('submit', handleAddButtonClick);
