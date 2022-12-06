export const BASE_URL = 'http://localhost:3000';
// export const BASE_URL = 'https://auth.nomoreparties.co';

function getResponseData(res) { 
    if(res.ok) { 
      return res.json(); 
    } else { 
      Promise.reject(`Ошибка ${res.status}`); 
    } 
  }

export const register = (password, email) => {
    return fetch(`${BASE_URL}/signup`, {
        method: 'POST',
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "password": password,
            "email": email    
        })
    })
    .then(getResponseData);
};
export const authorize = (password, email) => {
    return fetch(`${BASE_URL}/signin`, {
        method: 'POST',
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "password": password,
            "email": email    
        })
    })
    .then(getResponseData);
};

export const getContent = (token) => {
    return fetch(`${BASE_URL}/users/me`, {
        method: 'GET',
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization" : `Bearer ${token}`
        }
    })
    .then(getResponseData);
}