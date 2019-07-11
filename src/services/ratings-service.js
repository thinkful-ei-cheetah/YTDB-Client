import config from '../config';
import TokenService from './token-service';

const RatingsService = {

    getRatings() {
        return fetch(`${config.API_ENDPOINT}/rating`, {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
            },
        })
            .then(res =>
                (!res.ok)
                    ? res.json().then(e => Promise.reject(e))
                    : res.json()
            )
    },

    addRating(rating) {
        console.log(rating);
        return fetch(`${config.API_ENDPOINT}/rating`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'authorization': `basic ${TokenService.getAuthToken()}`
            },
            body: JSON.stringify(rating)
        })
            .then(res =>
                (!res.ok)
                    ? res.json().then(e => Promise.reject(e))
                    : res.json()
            )
    }

}

export default RatingsService;