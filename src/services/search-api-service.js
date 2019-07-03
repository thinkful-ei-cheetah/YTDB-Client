import config from '../config'

const baseURL = "https://www.googleapis.com/youtube/v3"
const apiKEY = ""
// 
const SearchApiService = {
  SearchChannels(searchterm) {
    return fetch(`${baseURL}/search?part=snippet&maxResults=20&order=relevance&q=${searchterm}&type=channel&key=${apiKEY}`, {
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
  }
}

export default SearchApiService