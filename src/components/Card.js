export default class Card { 
    constructor ({data, userId, cardSelector, handleCardClick, handleDeleteCard, handleDeleteLike, handleAddLike}) {
        this._data = data;
        this._handleCardDelete = handleDeleteCard;
        this._ownerId = data.owner._id;
        this._currentId = userId;
        this._element = "";
       this._link = data.link;
    this._name = data.name;
        this._handleCardClick = handleCardClick;
        this._cardSelector = cardSelector;
        this.cardDelete = this.cardDelete.bind(this);
        this._handleDeleteLike = handleDeleteLike;
        this._handleAddLike = handleAddLike;
        this.addLike = this.addLike.bind(this);
        this.deleteLike = this.deleteLike.bind(this);
        this._likeNumber = null;
    } 
     
    _getTemplate() { 
        const cardElement = document
        .querySelector(this._cardSelector)
        .content
        .firstElementChild
        .cloneNode(true); 
        return cardElement; 
    } 

        _getLike() {
            this._likeNumber = this._element.querySelector('.like-container__number');
            this._likesData = this._data.likes
            this._likeNumber.textContent = this._likesData.length;
        }

        _editLikeNumber(bull) {
            if (bull === true) {
             this._likeNumber.textContent =  parseInt(this._likeNumber.textContent) + 1;
            } else if (bull === false) {
            this._likeNumber.textContent = parseInt(this._likeNumber.textContent) - 1;
            }
        }

        _activateLike() {
            if (this._statusLike(this._likesBull) === true) {
                this._likeElement = this._element.querySelector('.like-container__like')
                this._likeElement.classList.add('like-container__like_active')
            } else if (this._statusLike === false) {
                this._element
                .querySelector('.like-container__like')
                .classList
                .remove('like-container__like_active')
            }
        }

        _statusLike() {
            return (this._likesBull = this._likesData.some((item) => {
                return (item._id === this._currentId)
            }))
            }

        defineLike(element, handleAddLike, handleDeleteLike, data) {
            this.likeButton = element.querySelector('.like-container__like');
            this.likeButton.addEventListener('click', function() {
                if (element.querySelector('.like-container__like')
                .classList
                .contains('like-container__like_active'))
                {
                    handleDeleteLike(data);
                } else {
                    handleAddLike(data);
                }

            })
        }

        addLike() {
            this._element
            .querySelector('.like-container__like')
            .classList
            .add('like-container__like_active');
            this._editLikeNumber(true)

        }

        deleteLike() {
            this._element
            .querySelector('.like-container__like')
            .classList
            .remove('like-container__like_active');
            this._editLikeNumber(false)
        }
 
        cardDelete() {
            this._element.remove();
            this._element = null;
        }
 
        _popupViewer() { 
            const cardPhoto = this._element.querySelector('.card__photo'); 
            cardPhoto.addEventListener('click', () => { 
                const data = this._data;
                this._handleCardClick(data);
            }); 
        } 
 
        _setEventListeners() { 
            
            const removeButton = this._element.querySelector('.button_type_delete'); 
            removeButton.addEventListener('click', () => { 
            this._handleCardDelete(this)
        }); 
            this._popupViewer(); 
             
        } 
 
    generateCard() {
        this._element = this._getTemplate(); 
        const image = this._element.querySelector('.card__photo'); 
        image.src = this._link; 
        this._element.querySelector('.card__title').textContent = this._name; 
        this._setEventListeners(); 
        this.defineLike(this._element, this._handleAddLike, this._handleDeleteLike, this._data);
        this._getLike();
        this._activateLike();

        if (this._ownerId != this._currentId) {
            this._removeElement = this._element.querySelector(".button_type_delete");
            this._removeElement.parentNode.removeChild(this._removeElement);

        }

        return this._element;
    } 
} 