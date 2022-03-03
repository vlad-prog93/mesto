export default class UserInfo {
  constructor(dataUser) {
    this._name = document.querySelector(dataUser.name);
    this._job = document.querySelector(dataUser.job);
    this._avatar = document.querySelector(dataUser.avatar);
  }

  getUserInfo() {
    return {
      name: this._name.textContent, 
      job: this._job.textContent,
      avatar: this._avatar,
    };
  }

  setUserInfo({name, about, avatar, _id}) {
    this._name.textContent = name;
    this._job.textContent = about;
    this._avatar.src = avatar;
    this.id = _id;
  }
}