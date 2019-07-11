import config from '../config';
import TokenService from './token-service';

const ReviewsService = {

    getReviews() {
        return fetch(`${config.API_ENDPOINT}/review`, {
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
    
    addReview(review) {
        console.log(review);
        return fetch(`${config.API_ENDPOINT}/review`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'authorization': `basic ${TokenService.getAuthToken()}`
            },
            body: JSON.stringify(review)
        })
            .then(res =>
                (!res.ok)
                    ? res.json().then(e => Promise.reject(e))
                    : res.json()
            )
    }

}

export default ReviewsService;