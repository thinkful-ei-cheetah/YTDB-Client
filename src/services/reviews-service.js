import config from '../config';
import TokenService from './token-service';

const ReviewsService = {

    getReviews(id) {
        console.log('getting reviews for channel:', id)

        return fetch(`${config.API_ENDPOINT}/reviews/${id}`, {
            method: 'GET',
            headers: {
                'content-type': 'application/json'
            },
        })
            .then(res =>
                (!res.ok)
                    ? res.json().then(e => Promise.reject(e))
                    : res.json()
            )
    },
    
    addReview(review, id) {
        console.log(id);
        return fetch(`${config.API_ENDPOINT}/reviews`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'authorization': `bearer ${TokenService.getAuthToken()}`
            },
            body: JSON.stringify({text:review, channelId: id})
        })
            .then(res =>
                (!res.ok)
                    ? res.json().then(e => Promise.reject(e))
                    : res.json()
            )
    }

}

export default ReviewsService;