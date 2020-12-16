let editButtonNode = document.querySelector('.button_type_edit');
const popupNode = document.querySelector('.popup');
let popupProfileNode = document.querySelector('.popup_add_profile');
const addButtonNode = document.querySelector('.button_type_add');
const popupCardNode = document.querySelector('.popup_add_card');
let closeProfileButtonNode = document.querySelector('.button_closed_profile');
const closeCardButtonNode = document.querySelector('.button_closed_card');
let infoTitleNode = document.querySelector('.profile__title');
let infoSubtitleNode = document.querySelector('.profile__subtitle');
let formNode = document.querySelector('.popup__form');
let formInputNameNode = document.querySelector('.popup__area_type_name');
let formInputAboutNode = document.querySelector('.popup__area_type_about');
const formInputNameCardNode = document.querySelector('.popup__area_type_name-card');
const formInputLinkNode = document.querySelector('.popup__area_type_link');
const popupCardForm = document.querySelector('.popup__form_card');
const root = document.querySelector('.root');


addButtonNode.addEventListener('click', function(){
    handleEditCardButtonClick(popupCardNode);
});

editButtonNode.addEventListener('click', function(){
    handleEditProfileButtonClick(popupProfileNode);
});

/*closeProfileButtonNode.addEventListener('click', function(){
    handleAddProfileButtonClick(popupNode);
});

closeCardButtonNode.addEventListener('click', function(){
    handleAddProfileButtonClick(popupNode);
});*/

root.addEventListener('click', handleAddProfileButtonClick)

function handleEditCardButtonClick(modal) {
    modal.classList.add('overlay');
}

function handleEditProfileButtonClick(popupProfileNode) {
    formInputNameNode.value = infoTitleNode.textContent;
    formInputAboutNode.value = infoSubtitleNode.textContent;
    handleEditCardButtonClick(popupProfileNode);
}

function handleAddProfileButtonClick(e, modal) {
    const closeButton = e.target;
    if (closeButton.classList.contains('button_type_closed'))
    {
        closeButton.closest('.popup').classList.remove('overlay');

    }
}

function handleFormSubmit(event) {
    event.preventDefault();
    infoTitleNode.textContent = formInputNameNode.value;
    infoSubtitleNode.textContent = formInputAboutNode.value;
    handleEditCardButtonClick(popupCardNode);
}

formNode.addEventListener('submit', handleFormSubmit);
formNode.addEventListener('submit', function(){
    handleAddProfileButtonClick(popupNode);
});

const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

const templateElement = document.querySelector('.template-container');
const gridContainerElement = document.querySelector('.photo-grid');
const cardElement = document.querySelector('.card');
const savedButtonNode = popupCardNode.querySelector('.button_type_saved');

function renderList() {

    const listItems = initialCards.map(createCard);
    gridContainerElement.append(...listItems);

}

function createCard (data) {
    const newItem = templateElement.content.cloneNode(true);
    let photoElement = newItem.querySelector('.card__photo');
    photoElement.src = data.link;
    const titleElement = newItem.querySelector('.card__title');
    titleElement.textContent = data.name;

    
    const removeButton = newItem.querySelector('.button_type_delete');
    removeButton.addEventListener('click', removeItem);

    let likeButton = newItem.querySelector('.card__like');
    likeButton.addEventListener('click', function(e) {
        onLikeButton(e.currentTarget);
    });

    const popupImageContainer = document.querySelector('.popup_add_image');
    photoElement.addEventListener('click', function(){
        openImagePopup(data)
    });

    function openImagePopup(data){
        const popupImageContainer = document.querySelector('.popup_add_image');
        const popupPic = popupImageContainer.querySelector('.popup__image');
            popupPic.src = data.link
        let popupText = popupImageContainer.querySelector('.popup__subtitle');
        popupText.textContent = data.name
            handleEditCardButtonClick(popupImageContainer);
        }

        return newItem;
}

function onLikeButton(like){
    like.classList.toggle('card__like_active');
}

function bindAddItemListener(){
    popupCardForm.addEventListener('submit', addNewItems)
}

function removeItem(e){
    const targetElement = e.target;
    const targetItem = targetElement.closest('.card');
    targetItem.remove();
}

function addNewItems(e) {
    e.preventDefault();
    let inputName = formInputNameCardNode.value;
    let inputLink = formInputLinkNode.value
    let objectData = {
        name: inputName,
        link: inputLink
    }
    const newItemHTML = createCard(objectData);
    
    gridContainerElement.prepend(newItemHTML);
    /*formInputNameCardNode.value = '';
    formInputLinkNode.value = '';*/
    popupCardNode.classList.remove('overlay');
}

bindAddItemListener();
renderList();
