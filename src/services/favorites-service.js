import config from '../config';

const FavoritesService = {
  
  getFavorites(id) {
    // /*dummy data. if this is active, the api call 
    // should be commented out and vice versa */
    // return [{     
    //   channelId: "UC1MiVrMfNrs5Ma4BetX-asA",
    //   channelTitle: "JustWant2PlayAGame",
    //   description: "Welcome to Dota 2 channel Here you can find highlights from random pub match, random pro match, major tournaments and many other interesting dota movies ...",
    //   liveBroadcastContent: "upcoming",
    //   publishedAt: "2010-07-20T16:51:13.000Z",
    //   thumbnails: {
    //       default: {
    //         url: "https://yt3.ggpht.com/-XGOzSOrITR8/AAAAAAAAAAI/AAAAAAAAAAA/DK02oI6MuuE/s88-c-k-no-mo-rj-c0xffffff/photo.jpg"
    //       },
    //       high: {
    //         url: "https://yt3.ggpht.com/-XGOzSOrITR8/AAAAAAAAAAI/AAAAAAAAAAA/DK02oI6MuuE/s800-c-k-no-mo-rj-c0xffffff/photo.jpg"
    //       },
    //       medium: {
    //         url: "https://yt3.ggpht.com/-XGOzSOrITR8/AAAAAAAAAAI/AAAAAAAAAAA/DK02oI6MuuE/s240-c-k-no-mo-rj-c0xffffff/photo.jpg"
    //       }
    //   },
    //   title:
    //       "JustWant2PlayAGame"
    // }]
    
    return fetch(`${config.API_ENDPOINT}/dashboard`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(id)
    })
      .then(res =>
        (!res.ok)
          ?res.json().then(e => Promise.reject(e))
          : res.json()
      )
  },

  saveFavorites(arr) {
    return fetch(`${config.API_ENDPOINT}/dashboard`, {
      method: 'PUT',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(arr)
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
  }
  
}

export default FavoritesService;