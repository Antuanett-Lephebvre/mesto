import {openImagePopup} from "./index.js";


export default class Card {
    constructor (initialCard, templateSelector) {
        this._initialCard = initialCard;
        this._templateSelector = templateSelector;
        this._card = null;
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

        const removeButton = this._card.querySelector('.button_type_delete');
        removeButton.addEventListener('click', this._removeItem);
    
            const cardPhoto = this._card.querySelector('.card__photo');
            cardPhoto.addEventListener('click', function(){
                openImagePopup(Data);
            });
    
            const likeButton = this._card.querySelector('.card__like');
            likeButton.addEventListener('click', function(e) {
                e.currentTarget.classList.toggle('card__like_active');
            });


        return this._card;
      }
        
        _removeItem(e){
            e.target.closest('.card').remove();
        }
}