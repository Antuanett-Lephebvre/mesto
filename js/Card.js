export default class Card {
    constructor (initialCards, templateSelector) {
        this._initialCards = initialCards;
        this._templateSelector = templateSelector;
        this._card = null;
        this._data = objectData;

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
        this._card.querySelector('.card__photo').src = this._initialCards.link;
        this._card.querySelector('.card__title').textContent = this._initialCards.name;

        return this._card;
      }

      openImagePopup(){
        const popupPic = popupImageContainer.querySelector('.popup__image');
            popupPic.src = this._data.link
    
        const popupText = popupImageContainer.querySelector('.popup__subtitle');
        popupText.textContent = this._data.name
            openPopup(popupImageContainer);
        }
        
}