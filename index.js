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
    const popupAccountForm = document.querySelector('.popup__form_account');
    const root = document.querySelector('.root');
    const templateElement = document.querySelector('.template-container');
    const gridContainerElement = document.querySelector('.photo-grid');
    const cardElement = document.querySelector('.card');
    const savedButtonNode = popupCardNode.querySelector('.button_type_saved');
    const popupImageContainer = document.querySelector('.popup_add_image');
    const invalidClass = document.querySelector('.button_type_invalid');


function openPopup(popup) {
    popup.classList.add('overlay');
    document.addEventListener('keydown', closePopupByEsc);
}

function closePopup(popup) {
    popup.classList.remove('overlay');
    document.removeEventListener('keydown', closePopupByEsc);
}

function closePopupByEsc(e) {
    if (e.key === 'Escape') {
        const popupVisible = document.querySelector('.overlay');
        closePopup(popupVisible);
    };
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
    popupCardForm.reset();

    setButtonState(savedButtonNode, popupCardForm.checkValidity(), validationConfig);

    closePopup(popupCardNode); 
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
    //setButtonState(savedButtonNode, false, invalidClass);
    addNewItems(e);
})

renderList();