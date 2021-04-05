export default class UserInfo { 
    constructor (name, about, avatar) { 
        this._nameValue = document.querySelector(name), 
        this._aboutValue = document.querySelector(about); 
        this._avatarValue = document.querySelector(avatar);
        this._name = "";
        this._about = "";
        this._avatar = "";
        this._id = "";
    }

    updateUserInfo() {
        this._nameValue.textContent = this._name,
        this._aboutValue.textContent = this._about;
        this._avatarValue.style.backgroundImage = `url(${this._avatar})`;
    }
 
    getUserInfo() { 
        return {
            userName: this._name,
            userDescription: this._about,
            userAvatar: this._userAvatar,
        }
    } 

    getMyId() {
        return this._id
    }

    editPhoto(data) {
        this._avatarValue.style.backgroundImage = `url(${data.avatar})`;
    }

    setUserInfo({name, about, avatar, _id}) {
        this._name = name;
        this._about = about;
        this._avatar = avatar;
        this._id = _id;
       this._nameValue.textContent = this._name; 
       this._aboutValue.textContent = this._about;
    }
} 