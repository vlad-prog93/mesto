export default class Api {
  constructor(options) {
    this._url = options.baseUrl;
    this._headers = {
      authorization: options.authorization, 
      'Content-Type': options['Content-Type']
    } 
  }

  getCards(dataCallApi) {
    return fetch(`${this._url}/${dataCallApi.cards}`, {
      headers: this._headers
    })
    .then(this._checkResponse)
  }

  getUserData(dataCallApi) {
    return fetch(`${this._url}/${dataCallApi.users}/${dataCallApi.me}`, {
      headers: this._headers
    })
    .then(this._checkResponse)
  }

  patchEditProfile(dataCallApi, data) {
    return fetch(`${this._url}/${dataCallApi.users}/${dataCallApi.me}`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about
      })
    })
    .then(this._checkResponse);
  }

  postCard(dataCallApi, data) {
    return fetch(`${this._url}/${dataCallApi.cards}`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link
      })
    })
    .then(this._checkResponse);
  }

  deleteCard(dataCallApi, dataId) {
    return fetch(`${this._url}/${dataCallApi.cards}/${dataId}`, {
      method: 'DELETE',
      headers: this._headers,
    })
    .then(this._checkResponse);
  }

  setLike(dataCallApi, cardId) {
    return fetch(`${this._url}/${dataCallApi.cards}/${cardId}/${dataCallApi.likes}`, {
      method: 'PUT',
      headers: this._headers,
    })
    .then(this._checkResponse);
  }

  deleteLike(dataCallApi, cardId) {
    return fetch(`${this._url}/${dataCallApi.cards}/${cardId}/${dataCallApi.likes}`, {
      method: 'DELETE',
      headers: this._headers,
    })
    .then(this._checkResponse);
  }

  patchAvatarApi(dataCallApi, avatar) {
    return fetch(`${this._url}/${dataCallApi.users}/${dataCallApi.me}/${dataCallApi.avatar}`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatar
      })
    })
    .then(this._checkResponse);
  }

  _checkResponse(res) {
    if (res.ok) return res.json()
    return Promise.reject(`Ошибка ${res.status}`);
  }
}