export default class Section{ 
    constructor ({items, renderer}, containerSelector) { 
        this._initialCards = items; 
        this._renderer = renderer; 
        this._container = containerSelector; 
    } 
 
    renderItems() { 
         
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