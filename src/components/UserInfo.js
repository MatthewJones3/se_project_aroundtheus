export default class UserInfo {
  constructor({ nameSelector, jobSelector, avatarSelector }) {
    this._nameElement = document.querySelector(nameSelector);
    this._jobElement = document.querySelector(jobSelector);
    this._avatarElement = document.querySelector(avatarSelector);

    if (!this._nameElement || !this._jobElement || !this._avatarElement) {
      console.error("UserInfo elements not found");
    }
  }

  getUserInfo() {
    return {
      name: this._nameElement.textContent,
      job: this._jobElement.textContent,
    };
  }

  setUserInfo({ name, job }) {
    if (this._nameElement && this._jobElement) {
      this._nameElement.textContent = name || this._nameElement.textContent;
      this._jobElement.textContent = job || this._jobElement.textContent;
    } else {
      console.error("UserInfo elements not found");
    }
  }

  setUserAvatar(avatar) {
    if (this._avatarElement) {
      this._avatarElement.src = avatar;
    } else {
      console.error("Avatar element not found");
    }
  }
}
