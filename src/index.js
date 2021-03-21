import '../styles/index.css';
import Card from "./components/Card.js";
import PopupWithForm from "./components/PopupWithForm.js";
import PopupWithImage from "./components/PopupWithImage.js";
import Section from "./components/Section.js";
import UserInfo from "./components/UserInfo.js";
import  FormValidation from "./components/FormValidation.js";

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

    const addButtonNode = document.querySelector('.button_type_add');
    const editButtonNode = document.querySelector('.button_type_edit');
    const popupCardForm = document.querySelector('.popup__form_card');
    const infoTitleNode = document.querySelector('.profile__title');
    const infoSubtitleNode = document.querySelector('.profile__subtitle');
    const gridContainerElement = document.querySelector('.photo-grid')

const validationConfig = {
    savedButtonNode: '.button_type_saved',
    inputSelector: '.popup__area',
    buttonInvalidClass: 'button_type_invalid',
    inputInvalidClass: 'popup__area_state_invalid',
}

    const validationFormAdd = new FormValidation(validationConfig, ".popup__form_card");
    validationFormAdd.enableValidation();
    const validationFormEdit = new FormValidation(validationConfig, ".popup__form_account");
    validationFormEdit.enableValidation();

    const userClass = new UserInfo('.profile__title', '.profile__subtitle');
    //const userClass = new UserInfo(infoTitleNode, infoSubtitleNode);
    
    //userClass.setUserInfo(infoTitleNode.textContent, infoSubtitleNode.textContent);


const createClassCard = function (item) {
    return new Card ({
        data: item, 
        handleCardClick: function forHandleCardClick () {
            imagePopup.open(item)},
    }, '.template-container').generateCard();
}
//инициализация класса попапа для изменения данных пользователя
const profileEditPopup = new PopupWithForm({
    popupSelector: '.popup_add_profile',
    handleFormSubmit: (data) => {
        userClass.setUserInfo(data);
        //userClass.updateUserInfo(data);
    }
});

profileEditPopup.setEventListeners();

const imagePopup = new PopupWithImage(".popup_add_image");


    const cardAddPopup = new PopupWithForm({
        popupSelector: '.popup_add_card',
        handleFormSubmit: (item) => {
            //console.log(item);
            const card = createClassCard(item);
            newCards.prependItem(card);
        }
    })

   
    const newCards = new Section({
        items: initialCards,
        renderer: (item) => {
            const card = createClassCard(item);
            newCards.appendItem(card);
    }
}, gridContainerElement)
    newCards.renderItems();

        cardAddPopup.setEventListeners();

    editButtonNode.addEventListener('click', () => {
        validationFormEdit.cleanError();
        userClass.getUserInfo();
        profileEditPopup.open();
        //profileEditPopup.setEventListeners();
    });

    addButtonNode.addEventListener('click', function(){
        popupCardForm.reset();
        validationFormAdd.setButtonState(popupCardForm.checkValidity());
        validationFormAdd.cleanError();
        cardAddPopup.open();
    });