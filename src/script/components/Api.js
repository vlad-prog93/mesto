export default class Api {
  constructor(options) {
    this._url = options.baseUrl;
    this._token = options.authorization;

  }

  getApi() {
    return fetch(`${this._url}`, {
      headers: {
        authorization: this._token
      }
    })
    .then(res => res.json())
    .catch((res) => console.log(`Ошибка ${res.status}`));
  }
  
  patchApi(data) {
    return fetch(`${this._url}`, {
      method: 'PATCH',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: data.name,
        about: data.job
      })
    })
    .then(res => res.json())
    .catch((res) => console.log(`Ошибка ${res.status}`));
  }

  postApi(data) {
    return fetch(`${this._url}`, {
      method: 'POST',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: data.name,
        link: data.link
      })
    })
    .then(res => res.json())
    .catch((res) => console.log(`Ошибка ${res.status}`));
  }

  deleteCard(dataId) {
    return fetch(`${this._url}/${dataId}`, {
      method: 'DELETE',
      headers: {
        authorization: this._token,
      },
    })
    .then(res => res.json())
    .catch((res) => console.log(`Ошибка ${res.status}`));
  }

  setLike(cardId) {
    return fetch(`${this._url}/${cardId}/likes`, {
      method: 'PUT',
      headers: {
        authorization: this._token,
      },
    })
    .then(res => res.json())
    .catch((res) => console.log(`Ошибка ${res.status}`));
  }

  deleteLike(cardId) {
    return fetch(`${this._url}/${cardId}/likes`, {
      method: 'DELETE',
      headers: {
        authorization: this._token,
      },
    })
    .then(res => res.json())
    .catch((res) => console.log(`Ошибка ${res.status}`));
  }

  patchAvatarApi(avatar) {
    return fetch(`${this._url}/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        avatar: avatar
      })
    })
    .then(res => res.json())
    .catch((res) => console.log(`Ошибка ${res.status}`));
  }

}