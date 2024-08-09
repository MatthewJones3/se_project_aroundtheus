/*export default class UserInfo {
  constructor({ nameSelector, jobSelector }) {
    this._nameElement = document.querySelector(nameSelector);
    this._jobElement = document.querySelector(jobSelector);
  }

  getUserInfo() {
    return {
      name: this._nameElement.textContent,
      job: this._jobElement.textContent,
    };
  }

  setUserInfo({ name, job }) {
    if (this._nameElement && this._jobElement) {
      this._nameElement.textContent = name;
      this._jobElement.textContent = job;
    } else {
      console.error("UserInfo elements not found");
    }
  }
}*/

export default class UserInfo {
  constructor({ nameSelector, jobSelector }) {
    this._nameElement = document.querySelector(nameSelector);
    this._jobElement = document.querySelector(jobSelector);

    if (!this._nameElement || !this._jobElement) {
      console.error("UserInfo elements not found");
    }
  }

  getUserInfo() {
    return {
      name: this._nameElement.textContent,
      job: this._jobElement.textContent,
    };
  }

  setUserInfo({ title, description }) {
    if (this._nameElement && this._jobElement) {
      this._nameElement.textContent = title;
      this._jobElement.textContent = description;
    } else {
      console.error("UserInfo elements not found");
    }
  }
}
