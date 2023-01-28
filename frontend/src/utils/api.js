import { config } from './utils'
export class Api {
    constructor({ url, headers}) {
      this._url = url;
      this._headers = headers;
    }
    _getResponseData(res) {
      if(res.ok) {
        return res.json();
      } else {
        Promise.reject(`Ошибка ${res.status}`);
      }
    }

    setToken(jwt) {
      this._headers.authorization = jwt;
    }

    //метод загрузки информации о пользователе с сервера
    getUserInfo() {
      return fetch(`${this._url}/users/me`, { headers: this._headers})
      .then(this._getResponseData);
    }
     //метод редактирования профиля пользователя
    updateProfileInfo({ name, about }) {
      return fetch(`${this._url}/users/me`, {
        method: "PATCH",
        headers: this._headers,
        body: JSON.stringify({ name, about })
      }).then(this._getResponseData);
    }
     //метод редактирования профиля аватара
    updateProfileAvatar({ avatar }) {
      return fetch(`${this._url}/users/me/avatar`, {
        method: "PATCH",
        headers: this._headers,
        body: JSON.stringify({ avatar })
      }).then(this._getResponseData);
    }
  
    //метод загрузки карточек с сервера
    getInitialCards() {
      return fetch(`${this._url}/cards`, { headers: this._headers
      }).then(this._getResponseData);
    }

    
    //метод добавления новой карточки
    addCard = ({ name, link }) => {
      return fetch(`${this._url}/cards`, {
        method: "POST",
        headers: this._headers,
        body: JSON.stringify({ name, link })
      }).then(this._getResponseData);
    }
     //метод удаления карточки 
    deleteCard = (id) => {
      return fetch(`${this._url}/cards/${id}`, {
        method: "DELETE",
        headers: this._headers
      }).then(this._getResponseData);
    }
  
    //метод  постановки лайка карточки
    likeCard = (id) => {
      return fetch(`${this._url}/cards/${id}/likes`, {
        method: "PUT",
        headers: this._headers
      }).then(this._getResponseData);
    }
    //метод снятия лайка
    inLikeCard = (id) => {
      return fetch(`${this._url}/cards/${id}/likes`, {
        method: "DELETE",
        headers: this._headers
      }).then(this._getResponseData);
    }
    //метод регистрации
    register = (password, email) => {
      return fetch(`${this._url}/signup`, {
          method: 'POST',
          headers: this._headers,
          body: JSON.stringify({
              "password": password,
              "email": email    
          })
      })
      .then(this._getResponseData);
    };
    //метод авторизации
    authorize = (password, email) => {
      console.log(password, email);
      return fetch(`${this._url}/signin`, {
          method: 'POST',
          headers: this._headers,
          body: JSON.stringify({ password, email })
      })
      .then(this._getResponseData);
    };
  };

  //экземпляр класса работы с сервером: Api
  const api = new Api(config);

  export { api };