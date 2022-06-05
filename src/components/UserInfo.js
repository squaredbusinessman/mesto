export default class UserInfo {
    constructor({ userNameSelector, userAboutSelector, userAvatarSelector }) {
        this._nameElement = document.querySelector(userNameSelector);
        this._aboutElement = document.querySelector(userAboutSelector);
        this._avatarElement = document.querySelector(userAvatarSelector);
    }

    getUserInfo() {
        return {
            name: this._nameElement.textContent,
            about: this._aboutElement.textContent,
        };
    }

    setUserInfo(newUserData) {
       this._nameElement.textContent = newUserData.name;
       this._aboutElement.textContent = newUserData.about;
       this._avatarElement.src = newUserData.avatar;
    }

    setUserAvatar(src) {
        this._avatarElement.src = src;
    }
}
