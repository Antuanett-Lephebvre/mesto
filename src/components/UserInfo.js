export default class UserInfo {
    constructor (name, about) {
        this._existName = name;
        this._existAbout = about
        this._formInputNameNode = document.querySelector('.popup__area_type_name');
        this._formInputAboutNode = document.querySelector('.popup__area_type_about');
        this._nameValue = document.querySelector(this._existName),
        this._aboutValue = document.querySelector(this._existAbout);
    }

    getUserInfo() {
        this._formInputNameNode.value = this._nameValue.textContent;
        this._formInputAboutNode.value = this._aboutValue.textContent;
    }

    setUserInfo() {
       this._nameValue.textContent = this._formInputNameNode.value;
       this._aboutValue.textContent = this._formInputAboutNode.value;
    }
}