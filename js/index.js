import Card from "./Card.js";
import  Validation from "./FormValidation.js";

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
const gridContainerElement = document.querySelector('.photo-grid');



initialCards.forEach(function (initialCard) {
    const card = new Card(initialCard, ".template-container").renderCard();
    gridContainerElement.append(card);
})




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
    const popupAccountForm = document.querySelector('.popup__form_account');
    const root = document.querySelector('.root');
    const templateElement = document.querySelector('.template-container');
    
    const savedButtonNode = popupCardNode.querySelector('.button_type_saved');
    const popupImageContainer = document.querySelector('.popup_add_image');

    const validationConfig = {
        savedButtonNode: '.button_type_saved',
        inputSelector: '.popup__area',
        buttonInvalidClass: 'button_type_invalid',
        inputInvalidClass: 'popup__area_state_invalid',
    }

    const validationFormAdd = new Validation(validationConfig, ".popup__form_card");
    validationFormAdd.enableValidation();
    const validationFormEdit = new Validation(validationConfig, ".popup__form_account");
    validationFormEdit.enableValidation();

export function openPopup(popup) {
    popup.classList.add('overlay');
    document.addEventListener('keydown', closePopupByEsc);
}

export function closePopup(popup) {
    popup.classList.remove('overlay');
    document.removeEventListener('keydown', closePopupByEsc);
    validationFormAdd.cleanError();
    validationFormEdit.cleanError();
}

function closePopupByEsc(e) {
    if (e.key === 'Escape') {
        const popupVisible = document.querySelector('.overlay');
        closePopup(popupVisible);
    };
}

function handleEditProfileButtonClick() {
    formInputNameNode.value = infoTitleNode.textContent;
    formInputAboutNode.value = infoSubtitleNode.textContent;
    openPopup(popupProfileNode);
}

function submitProfileForm(e) {
    e.preventDefault();
    infoTitleNode.textContent = formInputNameNode.value;
    infoSubtitleNode.textContent = formInputAboutNode.value;
    closePopup(popupProfileNode);
}

export function openImagePopup(data){
    const popupPic = popupImageContainer.querySelector('.popup__image');
        popupPic.src = data.link

    const popupText = popupImageContainer.querySelector('.popup__subtitle');
    popupText.textContent = data.name
        openPopup(popupImageContainer);
    }


export function onLikeButton(like){
    like.classList.toggle('card__like_active');
}

function removeItem(e){
    e.target.closest('.card').remove();
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

addButtonNode.addEventListener('click', function(){
    popupCardForm.reset();
    validationFormAdd.setButtonState(popupCardForm.checkValidity());
    openPopup(popupCardNode);
});

editButtonNode.addEventListener('click', function(popupProfileNode){
    handleEditProfileButtonClick(popupProfileNode);
});

popupAccountForm.addEventListener('submit', submitProfileForm);

popupProfileNode.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('overlay') || evt.target.classList.contains('button_type_closed')) {
        closePopup(popupProfileNode);
    }
})

popupCardNode.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('overlay') || evt.target.classList.contains('button_type_closed')) {
        closePopup(popupCardNode);
    }
})

popupImageContainer.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('overlay') || evt.target.classList.contains('button_type_closed')) {
        closePopup(popupImageContainer);
    }
})

popupCardForm.addEventListener('submit', function(e){ 
    const newCard = new Card(initialCards, ".template-container")
    newCard.addNewItems(e)})



//renderList();


