export default class Section{ 
    constructor ({renderer}, containerSelector) {
        this._renderer = renderer; 
        this._container = containerSelector; 
    } 
 
    renderItems(data) { 
        this._initialCards = data; 
        this._initialCards.forEach(item => { 
            this._renderer(item); 
        }); 
    } 
 
    prependItem(element) { 
        this._container.prepend(element); 
    } 
 
appendItem(element) { 
    this._container.append(element); 
} 
 
} 