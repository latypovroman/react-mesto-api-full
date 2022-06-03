class Api {
  constructor({ url, headers }) {
    this._url = url;
    this._headers = headers;
  }

  _isResOk(res) {
    return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
  }

  getInitialCards() {
    return fetch(`${this._url}/cards`, {
      headers: this._headers,
    }).then(this._isResOk);
  }

  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
      headers: this._headers,
    }).then(this._isResOk);
  }

  patchUserInfo({name, about}) {
    return fetch(`${this._url}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name,
        about
      }),
    }).then(this._isResOk);
  }

  postNewCard(data) {
    return fetch(`${this._url}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    }).then(this._isResOk);
  }

  deleteCard(data) {
    return fetch(`${this._url}/cards/${data._id}`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._isResOk);
  }

  putLike(data) {
    return fetch(`${this._url}/cards/${data._id}/likes`, {
      method: "PUT",
      headers: this._headers,
    }).then(this._isResOk);
  }

  deleteLike(data) {
    return fetch(`${this._url}/cards/${data._id}/likes`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._isResOk);
  }

  patchUserAvatar({avatar}) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar
      }),
    }).then(this._isResOk);
  }
}

const token = localStorage.getItem('jwt');
const api = new Api({
  url: "http://localhost:3001",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
});

export default api;
