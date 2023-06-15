

const popular = (arr) => {
    return arr.sort((a, b) => b.likes.length - a.likes.length)
}

const newest = (arr) => {
    return sortByDate(arr)
}

const lowPrice = (arr) => {
    return arr.sort((a, b) => (a.price - a.price / 100 * a.discount) - (b.price - b.price / 100 * b.discount))
}

const highPrice = (arr) => {
    return arr.sort((a, b) => b.price - a.price)
}

const rate = (arr) => {
    return arr.sort((a, b) => averRating(b.reviews) - averRating(a.reviews))
}

const discount = (arr) => {
    return arr.sort((a, b) => b.discount - a.discount)
}