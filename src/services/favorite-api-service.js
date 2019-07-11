import config from '../config';
import TokenService from './token-service';

const FavoriteApiService = {
  getFavorites() {
    return fetch(`${config.API_ENDPOINT}/favorite`, {
      method: 'GET',
      headers: {
        authorization: `Bearer ${TokenService.getAuthToken()}`
      }
    }).then(res => {
      return !res.ok ? res.json().then(e => Promise.reject(e)) : res.json();
    });
  },
  postFavorites(channelId) {
    return fetch(`${config.API_ENDPOINT}/favorite`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${TokenService.getAuthToken()}`
      },
      body: JSON.stringify({ channelId })
    }).then(res => {
      return !res.ok ? res.json().then(e => Promise.reject(e)) : res.json();
    });
  }
};

export default FavoriteApiService;
