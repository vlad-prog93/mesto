export default class UserInfo {
  constructor(dataUser) {
    this._name = document.querySelector(dataUser.name);
    this._job = document.querySelector(dataUser.job);
  }

  getUserInfo() {
    const data = {name: this._name.textContent, job: this._job.textContent};
    return data
  }

  setUserInfo(newDataUser) {
    this._name.textContent = newDataUser.name;
    this._job.textContent = newDataUser.job;
  }
}