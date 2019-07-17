import config from '../config'
import TokenService from './token-service';

const baseServerURL = config.API_ENDPOINT

const SearchApiService = {
  SearchChannels(search_term, ytapi) {
    return fetch(`${baseServerURL}/channels/search/${search_term}/${ytapi}`, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
      }
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
  },
  SearchChannelsByTopic(search_term, ytapi, topic) {
    return fetch(`${baseServerURL}/channels/search/${search_term}/${ytapi}/${encodeURIComponent(topic)}`, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
      }
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
  },
  ChannelsDirtyDetails(channelId) {
    return fetch(`${baseServerURL}/channels/${channelId}`, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
      }
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
  },
  getUserReview(channelId) {
    return fetch(`${baseServerURL}/channels/${channelId}/userrating`, {
        method: 'GET',
        headers: {
            'content-type': 'application/json',
            'authorization': `bearer ${TokenService.getAuthToken()}`
        },
    })
        .then(res =>
            (!res.ok)
                ? res.json().then(e => Promise.reject(e))
                : res.json()
        )
},
}

export default SearchApiService;