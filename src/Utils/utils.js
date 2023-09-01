import {addLike, deleteLike} from "./api/apiProducts";

export const url = "https://api.react-learning.ru"

// export const headers = {
//     "Content-Type": "application/json",
//     authorization: `${localStorage.getItem("token")}`
// }
export const headers = {
    "Content-Type": "application/json",
    authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDc0YmUzNWUwYmYyYzUxOWJjM2EwNDEiLCJncm91cCI6Imdyb3VwLTEyIiwiaWF0IjoxNjkzNTYxOTcwLCJleHAiOjE3MjUwOTc5NzB9.QpKpRGNOBrAZ52znDmwvUNQR_QFp7qru-Z6oiVjpZec"
}

export const changeProductLike = async (id, isLiked) => {
    const result = isLiked ? await deleteLike(id) : await addLike(id)
    return result
}

// export const refreshToken = (obj) => {
//     return {...obj, authorization: localStorage.getItem('token')};
// };

export const refreshToken = (obj) => {
    return {...obj, authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDc0YmUzNWUwYmYyYzUxOWJjM2EwNDEiLCJncm91cCI6Imdyb3VwLTEyIiwiaWF0IjoxNjkzNTYxOTcwLCJleHAiOjE3MjUwOTc5NzB9.QpKpRGNOBrAZ52znDmwvUNQR_QFp7qru-Z6oiVjpZec"};
};

export const response = (res) => {
    return res.ok ? res.json() : res.json().then((res) => Promise.reject(res));
}