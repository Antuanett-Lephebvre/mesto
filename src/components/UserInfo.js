export default class UserInfo { 
    constructor (name, about) { 
        this._existName = name; 
        this._existAbout = about 
        this._nameValue = document.querySelector(this._existName), 
        this._aboutValue = document.querySelector(this._existAbout); 
    } 
 
    getUserInfo() { 
        return {
            userName: this._nameValue.textContent,
            userDescription: this._aboutValue.textContent
        }
    } 
 

    setUserInfo(data) { 
       this._nameValue.textContent = data.name; 
       this._aboutValue.textContent = data.about; 
    } 
} 