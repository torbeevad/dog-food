import {addLike, deleteLike} from "./api";

export const changeProductLike = async (id, isLiked) => {
    const result = isLiked ? await deleteLike(id) : await addLike(id)
    return result
}

export const refreshToken = (obj) => {
    return { ...obj, authorization: localStorage.getItem('token') };
};