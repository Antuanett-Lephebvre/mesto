export default class UserInfo {
    constructor (name, about) {
        this._existName = name;
        this._existAbout = about,
        this._formInputNameNode = document.querySelector('.popup__area_type_name');
        this._formInputAboutNode = document.querySelector('.popup__area_type_about');
    }

    setUserInfo(newName, newAbout) {
        this._formInputNameNode.value = newName;
        this._formInputAboutNode.value = newAbout;
    }

    updateUserInfo() {
        this._existName.textContent = this._formInputNameNode.value;
        this._existAbout.textContent = this._formInputAboutNode.value;
    }
}