export default class Api {
  constructor(options) {
    this._url = options.baseUrl;
    this._token = options.authorization;

  }

  getApi() {
    return fetch(this._url, {
      headers: {
        authorization: this._token
      }
    })
    .then(res => res.json())
  }

  patchApi(data) {
    return fetch(this._url, {
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
  }

  postApi(data) {
    return fetch(this._url, {
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
  }
}