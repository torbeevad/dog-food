import {headers, url, refreshToken, response} from "../utils";


export const getUser = () => {
    return fetch(`${url}/v2/group-12/users/me/`, {
        method: "GET",
        headers: refreshToken(headers)
    }).then(res => response(res))
}

export const getRegistration = (data) => {
    return fetch(`${url}/signup/`, {
        method: "POST",
        body: JSON.stringify({...data, group: 'group-12'}),
        headers: refreshToken(headers)
    }).then(res => response(res))
}

export const getEnter = (data) => {
    return fetch(`${url}/signin/`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: refreshToken(headers)
    }).then(res => response(res))
}

export const forgotPassword = (data) => {
    return fetch(`${url}/forgot-password/`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: refreshToken(headers)
    }).then(res => response(res))
}

export const resetPassword = (data) => {
    return fetch(`${url}/password-reset/${data.Token}`, {
        method: "PATCH",
        body: JSON.stringify({password: data.password}),
        headers: {"Content-Type": "application/json"},
    }).then(res => response(res))
}
