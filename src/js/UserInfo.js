export default class UserInfo {
    constructor({ userNameSelector, userAboutSelector }) {
        this._nameElement = document.querySelector(userNameSelector);
        this._aboutElement = document.querySelector(userAboutSelector);
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
    }
}
