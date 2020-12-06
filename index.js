const editButtonNode = document.querySelector('.button_type_edit');
const popupNode = document.querySelector('.popup');
const closeButtonNode = document.querySelector('.button_type_closed');
const infoTitleNode = document.querySelector('.profile__title');
const infoSubtitleNode = document.querySelector('.profile__subtitle');
const formNode = document.querySelector('.popup__form');
const formInputNameNode = document.querySelector('.popup__area_name');
const formInputAboutNode = document.querySelector('.popup__area_about');


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
