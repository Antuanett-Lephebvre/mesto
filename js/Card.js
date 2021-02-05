import  Validation from "./FormValidation.js";
import {openPopup} from "./index.js";
import {closePopup} from "./index.js";
import {openImagePopup} from "./index.js";
import {onLikeButton} from "./index.js";


export default class Card {
    constructor (initialCard, templateSelector) {
        this._initialCard = initialCard;
        this._templateSelector = templateSelector;
        this._card = null;
        this.popupCardForm = document.querySelector('.popup__form_card');
        this.formInputNameCardNode = document.querySelector('.popup__area_type_name-card');
        this.formInputLinkNode = document.querySelector('.popup__area_type_link');
        this.templateElement = document.querySelector('.template-container');
        this.gridContainerElement = document.querySelector('.photo-grid');
        this.popupCardNode = document.querySelector('.popup_add_card');
        this.popupImageContainer = document.querySelector('.popup_add_image');
    }
    _getTemplate() {
        const cardElement = document
        .querySelector(this._templateSelector)
        .content
        .querySelector('.card')
        .cloneNode(true);
              
        return cardElement;
    }

    renderCard() {
        this._card = this._getTemplate();
        this._card.querySelector('.card__photo').src = this._initialCard.link;
        this._card.querySelector('.card__title').textContent = this._initialCard.name;

        const inputN = this._initialCard.name;
        const inputL = this._initialCard.link;
        const Data = {
            name: inputN,
            link: inputL
        }

        return this.createCard(Data);

        return this._card;
      }

        addNewItems(e) {
            e.preventDefault();
            const inputName = this.formInputNameCardNode.value;
            const inputLink = this.formInputLinkNode.value;
            const objectData = {
                name: inputName,
                link: inputLink
            }

            const newItemHTML = this.createCard(objectData);

            this.gridContainerElement.prepend(newItemHTML);
            this.popupCardForm.reset();

            this.savedButtonNode = this.popupCardNode.querySelector('.button_type_saved');
            

            closePopup(this.popupCardNode); 
        }

        onLikeButton(like){
            like.classList.toggle('card__like_active');
        }
        
        removeItem(e){
            e.target.closest('.card').remove();
        }
        
        createCard (data) {
            const newItem = this.templateElement.content.cloneNode(true);
            const photoElement = newItem.querySelector('.card__photo');
            photoElement.src = data.link;
            const titleElement = newItem.querySelector('.card__title');
            titleElement.textContent = data.name;
        
        
            const removeButton = newItem.querySelector('.button_type_delete');
            removeButton.addEventListener('click', this.removeItem);
        
            const likeButton = newItem.querySelector('.card__like');
        
            likeButton.addEventListener('click', function(e) {

                onLikeButton(e.currentTarget);
            });

            photoElement.addEventListener('click', function(){
                openImagePopup(data);
            });
                return newItem;
        }
}