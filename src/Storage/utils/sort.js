export const sortByDate = (arr) => {
    return arr.toSorted((a, b) => new Date(b.created_at) - new Date(a.created_at))
}

export const averRating = (arr) => {
    if (!arr.length) {
        return
    }
    return arr.reduce((acc, prev) => acc + prev.rating, 0) / arr.length;
}

export const popular = (arr) => {
    return arr.sort((a, b) => b.likes.length - a.likes.length)
}

export const newest = (arr) => {
    return sortByDate(arr)
}

export const lowPrice = (arr) => {
    return arr.sort((a, b) => (a.price - a.price / 100 * a.discount) - (b.price - b.price / 100 * b.discount))
}

export const highPrice = (arr) => {
    return arr.sort((a, b) => b.price - a.price)
}

export const rate = (arr) => {
    return arr.sort((a, b) => averRating(b.reviews) - averRating(a.reviews))
}

export const discount = (arr) => {
    return arr.sort((a, b) => b.discount - a.discount)
}