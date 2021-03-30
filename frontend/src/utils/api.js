export class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _handleRes(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(new Error(`Ошибка: ${res.status}`));
    }
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}cards`, {
      headers: this._headers,
    }).then((res) => this._handleRes(res));
  }

  addNewCard(name, link) {
    return fetch(`${this._baseUrl}cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    }).then((res) => this._handleRes(res));
  }

  deleteCard(id) {
    return fetch(`${this._baseUrl}cards/${id}`, {
      method: "DELETE",
      headers: this._headers,
    }).then((res) => this._handleRes(res));
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}users/me`, {
      headers: this._headers,
    }).then((res) => this._handleRes(res));
  }

  setUserInfo(popupName, popupCaption) {
    return fetch(`${this._baseUrl}users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: popupName,
        about: popupCaption,
      }),
    }).then((res) => this._handleRes(res));
  }

  setAvatar(avatarInputUrl) {
    return fetch(`${this._baseUrl}users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatarInputUrl,
      }),
    }).then((res) => this._handleRes(res));
  }

  changeLikeCardStatus(id, isLiked) {
    return fetch(`${this._baseUrl}cards/likes/${id}`, {
      method: `${isLiked ? "PUT" : "DELETE"}`,
      headers: this._headers,
    }).then((res) => this._handleRes(res));
  }
}

export const api = new Api({
  baseUrl: "https://api.front.maxmatyugin.nomoredomains.club/",
  headers: {
    "Authorization": `Bearer ${localStorage.getItem('token')}`,
    "Content-Type": "application/json",
  },
});
