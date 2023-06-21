import {headers, url, refreshToken, response} from "../utils";


export const getProducts = () => {
    return fetch(`${url}/products/`, {
        method: "GET",
        headers: refreshToken(headers)
    }).then(res => response(res))
}

export const getProductById = (id) => {
    return fetch(`${url}/products/${id}/`, {
        method: "GET",
        headers: refreshToken(headers)
    }).then(res => response(res))
}

export const searchProducts = (path) => {
    return fetch(`${url}/products/search?query=${path}`, {
        method: "GET",
        headers: refreshToken(headers)
    }).then(res => response(res))
}


export const addLike = (id) => {
    return fetch(`${url}/products/likes/${id}/`, {
        method: "PUT",
        headers: refreshToken(headers)
    }).then(res => response(res))
}

export const deleteLike = (id) => {
    return fetch(`${url}/products/likes/${id}/`, {
        method: "DELETE",
        headers: refreshToken(headers)
    }).then(res => response(res))
}

