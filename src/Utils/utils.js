import {addLike, deleteLike} from "./api";

export const changeProductLike = async (allProducts, product, isLiked) => {
    const result = isLiked ? await deleteLike(product._id) : await addLike(product._id)
    const updatedList = allProducts.map(e => e._id === result._id ? result : e)
    return updatedList
}