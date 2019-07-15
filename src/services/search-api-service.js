import config from '../config'

const baseURL = "https://www.googleapis.com/youtube/v3"
const apiKEY = process.env.REACT_APP_YTAPI

const baseServerURL = config.API_ENDPOINT

const SearchApiService = {
  // SearchChannels(searchterm) {
  //   return fetch(`${baseURL}/search?part=snippet&maxResults=20&order=relevance&q=${searchterm}&type=channel&key=${apiKEY}`, {
  //     method: 'GET',
  //     headers: {
  //       'content-type': 'application/json',
  //     }
  //   })
  //     .then(res =>
  //       (!res.ok)
  //         ? res.json().then(e => Promise.reject(e))
  //         : res.json()
  //     )
  // },
  SearchChannels(search_term, ytapi) {
    return fetch(`${baseServerURL}/channels/search/${search_term}/${ytapi}`, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
      }
      // body: JSON.stringify({
      //   search_term, 
      //   ytapi 
      // })
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
  // SearchChannelsByTopic(searchterm, topic) {
  //   return fetch(`${baseURL}/search?part=snippet&maxResults=20&order=relevance&q=${searchterm}&topicId=${encodeURI(topic)}&type=channel&key=${apiKEY}`, {
  //     method: 'GET',
  //     headers: {
  //       'content-type': 'application/json',
  //     }
  //   })
  //     .then(res =>
  //       (!res.ok)
  //         ? res.json().then(e => Promise.reject(e))
  //         : res.json()
  //     )
  // },
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
  // ChannelsDirtyDetails(channelId) {
  //   return fetch(`${baseURL}/channels?part=snippet%2Cstatistics%2CtopicDetails%2CbrandingSettings&id=${channelId}&maxResults=1&key=${apiKEY}`, {
  //     method: 'GET',
  //     headers: {
  //       'content-type': 'application/json',
  //     }
  //   })
  //     .then(res =>
  //       (!res.ok)
  //         ? res.json().then(e => Promise.reject(e))
  //         : res.json()
  //     )
  // }
}

export default SearchApiService;