const editButtonNode = document.querySelector('.button_edit');
const popupNode = document.querySelector('.popup');
const closeButtonNode = document.querySelector('.button_closed');
const infoTitleNode = document.querySelector('.info__title');
const infoSubtitleNode = document.querySelector('.info__subtitle');
const formNode = document.querySelector('.popup__form');
const formInputNameNode = document.querySelector('.input-container__area_name');
const formInputAboutNode = document.querySelector('.input-container__area_about');


editButtonNode.addEventListener('click', handleEditButtonClick);

function handleEditButtonClick() {
    popupNode.classList.add('popup_opened');
    formInputNameNode.value = infoTitleNode.textContent;
    formInputAboutNode.value = infoSubtitleNode.textContent;
}

closeButtonNode.addEventListener('click', handleAddButtonClick);

function handleAddButtonClick() {
    popupNode.classList.remove('popup_opened');
}

formNode.addEventListener('submit', handleFormSubmitName);

function handleFormSubmitName(event) {
    event.preventDefault();
    infoTitleNode.textContent = formInputNameNode.value;
    popupNode.classList.remove('popup_opened');
}

formNode.addEventListener('submit', handleFormSubmitAbout);

function handleFormSubmitAbout(event) {
    event.preventDefault();
    infoSubtitleNode.textContent = formInputAboutNode.value;
}

