import '../styles/index.css'; 
import Card from "./components/Card.js"; 
import PopupWithForm from "./components/PopupWithForm.js"; 
import PopupWithImage from "./components/PopupWithImage.js"; 
import Section from "./components/Section.js"; 
import UserInfo from "./components/UserInfo.js"; 
import  FormValidation from "./components/FormValidation.js"; 
import Api from "./components/Api.js";
import PopupWithSubmit from './components/PopupWithSubmit';
const options = {
    url: 'https://mesto.nomoreparties.co/v1/cohort-21',

    headers: {
        authorization: '3ae510e7-8a3a-4f20-bc67-945bad37f2c2',
        'Content-Type': 'application/json'
    }
}
const api = new Api(options);
 
    const addButtonNode = document.querySelector('.button_type_add'); 
    const editButtonNode = document.querySelector('.button_type_edit'); 
    const popupCardForm = document.querySelector('.popup__form_card');
    const popupAvatarForm = document.querySelector('.popup__form_avatar')
    const gridContainerElement = document.querySelector('.photo-grid') 
    const formInputNameNode = document.querySelector('.popup__area_type_name'); 
    const formInputAboutNode = document.querySelector('.popup__area_type_about'); 
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
    const validationFormAvatar = new FormValidation(validationConfig, ".popup__form_avatar");
    validationFormAvatar.enableValidation();
    const editAvatarButtonNode = document.querySelector('.profile__photo');
    const userClass = new UserInfo('.profile__title', '.profile__subtitle', '.profile__photo'); 
    
    const newCards = new Section({  
        renderer: (data) => {
            const card = createClassCard(data)
        newCards.appendItem(card)}},
         gridContainerElement)
    
function createClassCard (data) 
    {

const classCard = new Card ({
    data:data,
    userId: userId,
    cardSelector:  '.template-container',
    handleCardClick: (data) => {
        imagePopup.open(data)
    },

    handleDeleteCard: (item) => {
        submitPopup.setSubmitCallback(() => {
            api.deleteCard(data._id)
            .then(() => {
                item.cardDelete();
                submitPopup.close();
            })
            .catch((err) => {
                console.log(err);
            });
        });
        submitPopup.open();
    },

    handleDeleteLike: (data) => {
        api.removeLike(data)
        .then(() => {
            classCard.deleteLike();
        })
        .catch((err) => {
            console.log(err);
        });
    },

    handleAddLike: (data) => {
        api.addLike(data)
        .then(() => {
            classCard.addLike();
        })
        .catch((err) => {
            console.log(err);
        });
    }
})
const cardElement = classCard.generateCard(userClass.getMyId());
return cardElement;
    }
    let userId = null;

api.getAllInfo()
    .then(([dataUser, cardsData]) =>{ 
        userClass.setUserInfo(dataUser);
        userClass.updateUserInfo();
        userId = userClass.getMyId();

        newCards.renderItems(cardsData);
    })
    .catch(err => console.log(err))

//инициализация класса попапа для изменения данных пользователя 
const profileEditPopup = new PopupWithForm({ 
    popupSelector: '.popup_add_profile', 
    handleFormSubmit: (data) => {
        userClass.loadingFunction(false, '.popup_add_profile');
       api.editProfile(data)
       .then((data) => {userClass.setUserInfo(data);
                        userClass.updateUserInfo(data)})
       .catch(err => {console.log(err)})
       .finally(() => {
           profileEditPopup.close();
        userClass.loadingFunction(true, '.popup_add_profile');
       })

    } 
}); 

profileEditPopup.setEventListeners();

const imagePopup = new PopupWithImage(".popup_add_image"); 
imagePopup.setEventListeners();

    const cardAddPopup = new PopupWithForm({ 
        popupSelector: '.popup_add_card', 
        handleFormSubmit: (item) => { 
            userClass.loadingFunction(false, '.popup_add_card');
            api.createCard(item)
        .then((item) => {
            const card = createClassCard(item);
            newCards.prependItem(card)
        })
    .catch((err) => {
        console.log('Не удалось отправить карточку ' + err)
    })
    .finally(() => {
        cardAddPopup.close()
        userClass.loadingFunction(true, '.popup_add_card');
       })
} 
    }) 
 cardAddPopup.setEventListeners();

    const avatarEditPopup = new PopupWithForm({
        popupSelector: '.popup_add_avatar',
        handleFormSubmit: (item) => {
            userClass.loadingFunction(false, '.popup_add_avatar');
            api.editAvatar(item)
            .then((item) => {
                userClass.editPhoto(item);
            })
            .catch((err) => {
                console.log('Не удалось отправить карточку ' + err)
            })
            .finally(() => {
                avatarEditPopup.close()
                userClass.loadingFunction(true, '.popup_add_avatar');
               })
        }
    })

    avatarEditPopup.setEventListeners();

    const submitPopup = new PopupWithSubmit({
        popupSelector: '.popup_add_confirm',
        handleFormSubmit: () => {

        }
    })
    submitPopup.setEventListeners();
    
 
    editButtonNode.addEventListener('click', () => { 
        validationFormEdit.cleanError(); 
        const info = userClass.getUserInfo();
        formInputNameNode.value = info.userName;
        formInputAboutNode.value = info.userDescription;
        profileEditPopup.open(); 
    }); 
 
    addButtonNode.addEventListener('click', function(){ 
        popupCardForm.reset(); 
        validationFormAdd.setButtonState(popupCardForm.checkValidity()); 
        validationFormAdd.cleanError(); 
        cardAddPopup.open(); 
    });

    editAvatarButtonNode.addEventListener('click', function() {
        popupAvatarForm.reset();
        validationFormAvatar.setButtonState(popupAvatarForm.checkValidity());
        validationFormAvatar.cleanError();
        avatarEditPopup.open();
    })