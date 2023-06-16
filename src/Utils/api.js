const url = "https://api.react-learning.ru"

const headers = {
    "Content-Type": "application/json",
    authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDc0YmUzNWUwYmYyYzUxOWJjM2EwNDEiLCJncm91cCI6Imdyb3VwLTEyIiwiaWF0IjoxNjg1MzcyNjM3LCJleHAiOjE3MTY5MDg2Mzd9.oLZ9-C_BxpZfHGFZME63UoVi76OJQgwosZpjEhIiJnI"
}
    // `${localStorage.getItem("token")}`
    // "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDc0YmUzNWUwYmYyYzUxOWJjM2EwNDEiLCJncm91cCI6Imdyb3VwLTEyIiwiaWF0IjoxNjg1MzcyNjM3LCJleHAiOjE3MTY5MDg2Mzd9.oLZ9-C_BxpZfHGFZME63UoVi76OJQgwosZpjEhIiJnI"

const response = (res) => {
    return res?.json()
}

export const getProducts = () => {
    return fetch(`${url}/products/`, {
        method: "GET",
        headers
    }).then(res => res.json().then(res => res.products).catch((error) => {
        console.error(error);
    }))
}

export const getProductById = (id) => {
    return fetch(`${url}/products/${id}/`, {
        method: "GET",
        headers
    }).then(res => response(res))
}

export const searchProducts = (path) => {
    return fetch(`${url}/products/search?query=${path}`, {
        method: "GET",
        headers
    }).then(res => response(res))
}

export const getAllReviews = () => {
    return fetch(`${url}/products/review/`, {
        method: "GET",
        headers
    }).then(res => response(res))
}

export const getReviewsById = (id) => {
    return fetch(`${url}/products/review/${id}/`, {
        method: "GET",
        headers
    }).then(res => response(res))
}

export const setReviewById = (id, data, rating) => {
    return fetch(`${url}/products/review/${id}/`, {
        method: "POST",
        body: JSON.stringify({...data, rating}),
        headers
    }).then(res => response(res))
}

export const deleteReviewById = (productId, reviewId) => {
    return fetch(`${url}/products//review/${productId}/${reviewId}/`, {
        method: "DELETE",
        headers
    }).then(res => response(res))
}

export const getUser = () => {
    return fetch(`${url}/v2/group-12/users/me/`, {
        method: "GET",
        headers
    }).then(res => response(res))
}

export const addLike = (id) => {
    return fetch(`${url}/products/likes/${id}/`, {
        method: "PUT",
        headers
    }).then(res => response(res))
}

export const deleteLike = (id) => {
    return fetch(`${url}/products/likes/${id}/`, {
        method: "DELETE",
        headers
    }).then(res => response(res))
}

export const getRegistration = (data) => {
    return fetch(`${url}/signup/`, {
        method: "POST",
        body: JSON.stringify({...data, group: 'group-12'}),
        headers
    }).then(res => response(res))
}

export const getEnter = (data) => {
    return fetch(`${url}/signin/`, {
        method: "POST",
        body: JSON.stringify(data),
        headers
    }).then(res => response(res))
}

export const resetPassword = (data) => {
    return fetch(`${url}/forgot-password/`, {
        method: "POST",
        body: JSON.stringify(data),
        headers
    }).then(res => response(res))
}