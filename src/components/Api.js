export default class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    }).then(this._checkResponse);
  }

  updateUserInfo(name, about) {
    console.log("Updating user info with:", { name, about });
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers, // Using this._headers
      body: JSON.stringify({ name, about }),
    }).then(this._checkResponse);
  }

  updateAvatar(avatarUrl) {
    console.log("Updating avatar with URL:", avatarUrl);
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers, // Using this._headers
      body: JSON.stringify({ avatar: avatarUrl }),
    }).then(this._checkResponse);
  }

  getCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
    }).then(this._checkResponse);
  }

  addCard(name, link) {
    console.log("Adding card with name:", name, "and link:", link);
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers, // Using this._headers
      body: JSON.stringify({ name, link }),
    }).then(this._checkResponse);
  }

  deleteCard(cardId) {
    console.log("Deleting card with ID:", cardId);
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._checkResponse);
  }

  likeCard(cardId) {
    console.log("Liking card with ID:", cardId);
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: this._headers,
    }).then(this._checkResponse);
  }

  dislikeCard(cardId) {
    console.log("Disliking card with ID:", cardId);
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._checkResponse);
  }

  getUserInfoAndCards() {
    return Promise.all([this.getUserInfo(), this.getCards()]);
  }
}
