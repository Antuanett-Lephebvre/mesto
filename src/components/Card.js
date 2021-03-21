export default class Card {
    constructor ({data,  handleCardClick}, template) {
        this._element = "";
        this._link = data.link;
        this._name = data.name;
        this._handleCardClick = handleCardClick;
        this._template = template;

    }
    
    _getTemplate() {
        const cardElement = document.querySelector(this._template).content.querySelector(
        '.card').cloneNode(true);
        //this._addItem(cardElement); 
        this._cardElement = cardElement;
        return cardElement;
    }

        _like() {
            const likeButton = this._element.querySelector('.card__like');
            likeButton.addEventListener('click', function() {
                this.classList.toggle('card__like_active');
            });
        }

        _cardDelete() {
            const removeButton = this._element.querySelector('.button_type_delete');
            removeButton.addEventListener('click', function(e){
            e.target.closest('.card').remove();
        });
        }

        _popupViewer() {
            const cardPhoto = this._element.querySelector('.card__photo');
            cardPhoto.addEventListener('click', () => {
                this._handleCardClick(this._Data);
            });
        }

        _setEventListeners() {
            this._like();
            this._cardDelete();
            this._popupViewer();
            
        }

    generateCard() {
        this._element = this._getTemplate();
        const image = this._element.querySelector('.card__photo');
        image.src = this._link;
        this._element.querySelector('.card__title').textContent = this._name;
        this._setEventListeners();
        return this._element;
    }
}