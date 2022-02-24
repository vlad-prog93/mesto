export default class Api {
  constructor(options, method, {render}) {
    this._url = options.baseUrl;
    this._token = options.authorization;
    this._contentType = options['Content-Type'];
    this._method = method;
    this._render = render;
  }

  getApi() {
    return fetch(this._url, {
      method: this._method,
      headers: {
        authorization: this._token
      }
    })
    .then(res => res.json())
    .then(result => {this._render(result)})
  }

  deleteCard(cardId) {
    return fetch(this._url + '/' + cardId, {
      method: this._method,
      headers: {
        authorization: this._token
      },
    })
    .then(res => {res.json()})
    .then(res => console.log(res));
  }

  setCardApi(card) {
    return fetch(this._url, {
      method: this._method,
      headers: {
        authorization: this._token,
        'Content-Type': this._contentType
      },
      body: JSON.stringify({
        name: card.name,
        link: card.link
      })
    })
  }

  setProfileApi(data) {
    fetch(this._url, {
      method: this._method,
      headers: {
        authorization: this._token,
        'Content-Type': this._contentType
      },
      body: JSON.stringify({
        'name': data.name,
        'about': data.job
      })
    })
  }
}