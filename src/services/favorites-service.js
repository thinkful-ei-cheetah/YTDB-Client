import config from '../config';
import TokenService from './token-service';

const FavoritesService = {
  getFavorites() {
    return fetch(`${config.API_ENDPOINT}/favorite`, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        'authorization': `bearer ${TokenService.getAuthToken()}`,
      },
    })
      .then(res =>
        (!res.ok)
          ?res.json().then(e => Promise.reject(e))
          : res.json()
      )
  },

  addFavorite(obj) {
    return fetch(`${config.API_ENDPOINT}/favorite`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'authorization': `bearer ${TokenService.getAuthToken()}`
      },
      body: JSON.stringify(obj)
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
  },

  removeFavorite(obj) {
      return fetch(`${config.API_ENDPOINT}/favorite`, {
        method: 'DELETE',
        headers: {
          'content-type': 'application/json',
          'authorization': `bearer ${TokenService.getAuthToken()}`
        },
        body: JSON.stringify(obj)
      })
        .then(res => {
          if (!res.ok) {
            res.json().then(e => Promise.reject(e))
          }}
        )
  }
}

export default FavoritesService;