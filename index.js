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

const editButtonNode = document.querySelector('.button_type_edit');
const popupProfileNode = document.querySelector('.popup_add_profile');
const addButtonNode = document.querySelector('.button_type_add');
const popupCardNode = document.querySelector('.popup_add_card');
const closeProfileButtonNode = document.querySelector('.button_closed_profile');
const closeCardButtonNode = document.querySelector('.button_closed_card');
const closeImageButtonNode = document.querySelector('.button_closed_image');
const infoTitleNode = document.querySelector('.profile__title');
const infoSubtitleNode = document.querySelector('.profile__subtitle');
const formInputNameNode = document.querySelector('.popup__area_type_name');
const formInputAboutNode = document.querySelector('.popup__area_type_about');
const formInputNameCardNode = document.querySelector('.popup__area_type_name-card');
const formInputLinkNode = document.querySelector('.popup__area_type_link');
const popupCardForm = document.querySelector('.popup__form_card');
const root = document.querySelector('.root');
const templateElement = document.querySelector('.template-container');
const gridContainerElement = document.querySelector('.photo-grid');
const cardElement = document.querySelector('.card');
const savedButtonNode = popupCardNode.querySelector('.button_type_saved');
const popupImageContainer = document.querySelector('.popup_add_image');

function openPopup(popup) {
    popup.classList.add('overlay');
}

function closePopup(popup) {
    popup.classList.remove('overlay');
}

function handleEditProfileButtonClick() {
    formInputNameNode.value = infoTitleNode.textContent;
    formInputAboutNode.value = infoSubtitleNode.textContent;
    openPopup(popupProfileNode);
}

function definitionPopup(e) {
    const closeButtonCard = e.target;
    if (closeButtonCard.classList.contains('button_type_closed'))
    {
        const identityPopup = closeButtonCard.closest('.popup');
        closePopup(identityPopup);

    }
}

function submitProfileForm(e) {
    e.preventDefault();
    infoTitleNode.textContent = formInputNameNode.value;
    infoSubtitleNode.textContent = formInputAboutNode.value;
    closePopup(popupProfileNode);
}

function renderList() {
    const listItems = initialCards.map(createCard);
    gridContainerElement.append(...listItems);
}

function createCard (data) {
    const newItem = templateElement.content.cloneNode(true);
    const photoElement = newItem.querySelector('.card__photo');
    photoElement.src = data.link;
    const titleElement = newItem.querySelector('.card__title');
    titleElement.textContent = data.name;


    const removeButton = newItem.querySelector('.button_type_delete');
    removeButton.addEventListener('click', removeItem);

    const likeButton = newItem.querySelector('.card__like');
    likeButton.addEventListener('click', function(e) {
        onLikeButton(e.currentTarget);
    });

    photoElement.addEventListener('click', function(){
        openImagePopup(data);
    });
        return newItem;
}

function openImagePopup(data){
    const popupPic = popupImageContainer.querySelector('.popup__image');
        popupPic.src = data.link

    const popupText = popupImageContainer.querySelector('.popup__subtitle');
    popupText.textContent = data.name
        openPopup(popupImageContainer);
    }


function onLikeButton(like){
    like.classList.toggle('card__like_active');
}

function removeItem(e){
    const targetElement = e.target;
    const targetItem = targetElement.closest('.card');
    targetItem.remove();
}

function addNewItems(e) {
    e.preventDefault();
    const inputName = formInputNameCardNode.value;
    const inputLink = formInputLinkNode.value;
    const objectData = {
        name: inputName,
        link: inputLink
    }
    const newItemHTML = createCard(objectData);

    gridContainerElement.prepend(newItemHTML);

    closePopup(popupCardNode);
}

closeProfileButtonNode.addEventListener('click', function(){
    closePopup(popupProfileNode)
})

closeCardButtonNode.addEventListener('click', function(){
    closePopup(popupCardNode)
})

closeImageButtonNode.addEventListener('click', function(){
    closePopup(popupImageContainer)
})

popupProfileNode.addEventListener('submit', submitProfileForm);

addButtonNode.addEventListener('click', function(){
    openPopup(popupCardNode);
});

editButtonNode.addEventListener('click', function(popupProfileNode){
    handleEditProfileButtonClick(popupProfileNode);
});

popupCardForm.addEventListener('submit', addNewItems);

renderList();