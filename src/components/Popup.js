export default class Popup{
    constructor(popupSelector) {
        this._popupSelector = popupSelector;
        this._popup = document.querySelector(this._popupSelector);
        this._handleEscClose = this._handleEscClose.bind(this);
    }
    open () {
        this._popup.classList.add('overlay');
        document.addEventListener('keydown', this._handleEscClose);
    }

    close () {
        this._popup.classList.remove('overlay');
        document.removeEventListener('keydown', this._handleEscClose);
    }

    _handleEscClose (e) {
        if (e.key === 'Escape') {
            this.close();
        };  
    }

    setEventListeners () {
        this._popup.addEventListener('click', (evt) => {
            if (evt.target.classList.contains('overlay') || evt.target.classList.contains('button_type_closed')){
            this.close()
            }
        });
    }
}