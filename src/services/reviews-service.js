import config from '../config';

const ReviewsService = {

    getReviews() {
        return fetch(`${config.API_ENDPOINT}/dashboard`, {
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

    saveReview(arr) {
        return fetch(`${config.API_ENDPOINT}/dashboard`, {
            method: 'POST',
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

export default ReviewsService;