/*class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  _fetch(endpoint, options = {}) {
    return fetch(`${this._baseUrl}${endpoint}`, {
      ...options,
      headers: {
        ...this._headers,
        ...options.headers,
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Error: ${res.status}`);
      })
      .catch((err) => {
        console.error("Fetch Error:", err);
        throw err;
      });
  }

  getInitialCards() {
    return this._fetch("/cards");
  }

  getUserInfo() {
    return this._fetch("/users/me");
  }

  updateUserProfile(data) {
    return this._fetch("/users/me", {
      method: "PATCH",
      body: JSON.stringify(data),
    });
  }

  updateUserAvatar(avatar) {
    return this._fetch("/users/me/avatar", {
      method: "PATCH",
      body: JSON.stringify({ avatar }),
    });
  }

  addCard(data) {
    return this._fetch("/cards", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  deleteCard(cardId) {
    return this._fetch(`/cards/${cardId}`, {
      method: "DELETE",
    });
  }

  likeCard(cardId) {
    return this._fetch(`/cards/${cardId}/likes`, {
      method: "PUT",
    });
  }

  dislikeCard(cardId) {
    return this._fetch(`/cards/${cardId}/likes`, {
      method: "DELETE",
    });
  }

  loadUserAndCards() {
    return Promise.all([this.getUserInfo(), this.getInitialCards()]);
  }
}

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "3b106730-7f1e-4891-8b91-475561e3309f",
    "Content-Type": "application/json",
  },
});*/

class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _makeRequest(url, options) {
    return fetch(`${this._baseUrl}${url}`, {
      ...options,
      headers: {
        ...this._headers,
        ...options.headers,
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Error: ${res.status}`);
      })
      .catch((err) => {
        console.error(err);
        throw err;
      });
  }

  getInitialCards() {
    return this._makeRequest("/cards");
  }

  getUserInfo() {
    return this._makeRequest("/users/me");
  }

  updateProfile(name, about) {
    return this._makeRequest("/users/me", {
      method: "PATCH",
      body: JSON.stringify({ name, about }),
    });
  }

  updateAvatar(avatar) {
    return this._makeRequest("/users/me/avatar", {
      method: "PATCH",
      body: JSON.stringify({ avatar }),
    });
  }

  addCard(name, link) {
    return this._makeRequest("/cards", {
      method: "POST",
      body: JSON.stringify({ name, link }),
    });
  }

  deleteCard(cardId) {
    return this._makeRequest(`/cards/${cardId}`, {
      method: "DELETE",
    });
  }

  addLike(cardId) {
    return this._makeRequest(`/cards/${cardId}/likes`, {
      method: "PUT",
    });
  }

  removeLike(cardId) {
    return this._makeRequest(`/cards/${cardId}/likes`, {
      method: "DELETE",
    });
  }
}

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "c56e30dc-2883-4270-a59e-b2f7bae969c6",
    "Content-Type": "application/json",
  },
});

api
  .getInitialCards()
  .then((cards) => {
    console.log(cards);
  })
  .catch((err) => {
    console.error(err);
  });

api
  .getUserInfo()
  .then((userInfo) => {
    console.log(userInfo);
  })
  .catch((err) => {
    console.error(err);
  });
