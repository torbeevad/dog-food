import {headers, url, refreshToken, response} from "../utils";


export const getAllReviews = () => {
    return fetch(`${url}/products/review/`, {
        method: "GET",
        headers: refreshToken(headers)
    }).then(res => response(res))
}

export const getReviewsById = (id) => {
    return fetch(`${url}/products/review/${id}/`, {
        method: "GET",
        headers: refreshToken(headers)
    }).then(res => response(res))
}

export const setReviewById = (id, data, rating) => {
    return fetch(`${url}/products/review/${id}/`, {
        method: "POST",
        body: JSON.stringify({...data, rating}),
        headers: refreshToken(headers)
    }).then(res => response(res))
}

export const deleteReviewById = (productId, reviewId) => {
    return fetch(`${url}/products/review/${productId}/${reviewId}/`, {
        method: "DELETE",
        headers: refreshToken(headers)
    }).then(res => response(res))
}