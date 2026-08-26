// node server.js

class Api {
  constructor(baseUrl) {
    this._baseUrl = baseUrl;
  }

  _getAuthHeader() {
    const token = localStorage.getItem('jwt_token');
    return token ? { authorization: `Bearer ${token}` } : {};
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return res.json().then(err => Promise.reject(err.message || `Ошибка: ${res.status}`));
  }

  // Авторизация
  login(data) {
    return fetch(`${this._baseUrl}/signin`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then(this._checkResponse)
      .then((res) => {
        localStorage.setItem('jwt_token', res.token);
        return res;
      });
  }

  // Регистрация
  register(data) {
    return fetch(`${this._baseUrl}/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).then(this._checkResponse);
  }

  // Данные профиля
  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: {
        ...this._getAuthHeader(),
      },
    }).then(this._checkResponse);
  }

  // Обновление профиля
  updateUserInfo(data) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: {
        ...this._getAuthHeader(),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then(this._checkResponse);
  }

  // Список товаров
  getProductsList() {
    return fetch(`${this._baseUrl}/products`, {
      headers: {
        ...this._getAuthHeader(),
      },
    }).then(this._checkResponse);
  }

  // Товар по ID
  getProductById(productId) {
    return fetch(`${this._baseUrl}/products/${productId}`, {
      headers: {
        ...this._getAuthHeader(),
      },
    }).then(this._checkResponse);
  }

  // Поставить/снять лайк
  changeProductLikeStatus(productId, isLiked) {
    return fetch(`${this._baseUrl}/products/likes/${productId}`, {
      method: isLiked ? "DELETE" : "PUT",
      headers: {
        ...this._getAuthHeader(),
      },
    }).then(this._checkResponse);
  }
}

export const api = new Api("http://localhost:3001");

/* 
// ПРАВА И АВТОРИЗАЦИЯ
POST   http://localhost:3001/signin             // авторизация (вход) пользователя
POST   http://localhost:3001/signup             // регистрация нового пользователя

// ПРО ПОЛЬЗОВАТЕЛЕЙ
GET    http://localhost:3001/users/me           // получение данных текущего пользователя
PATCH  http://localhost:3001/users/me           // обновление профиля пользователя (имя, о себе)

// ПРО ПРОДУКТЫ
GET    http://localhost:3001/products           // получение всех товаров
GET    http://localhost:3001/products/:id       // получение товара по id
PUT    http://localhost:3001/products/likes/:id // поставить лайк товару
DELETE http://localhost:3001/products/likes/:id // снять лайк с товара
*/