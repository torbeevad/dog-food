import {addLike, deleteLike} from "./api/apiProducts";

export const url = "https://api.react-learning.ru"

export const headers = {
    "Content-Type": "application/json",
    authorization: `${localStorage.getItem("token")}`
}

export const changeProductLike = async (id, isLiked) => {
    const result = isLiked ? await deleteLike(id) : await addLike(id)
    return result
}

export const refreshToken = (obj) => {
    return {...obj, authorization: localStorage.getItem('token')};
};

export const response = (res) => {
    return res.ok ? res.json() : res.json().then((res) => Promise.reject(res));
}