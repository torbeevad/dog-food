import React from "react";
import styles from "./sort.module.css"

export const Sort = ({products, setSort}) => {

    const popular = () => {
        setSort(products.sort((a, b) => b.likes.length - a.likes.length))
    }

    const newest = () => {
        setSort(products.filter(products => products.tags.includes("new")))
    }

    const lowPrice = () => {
        setSort(products.sort((a, b) => (a.price - a.price / 100 * a.discount) - (b.price - b.price / 100 * b.discount)))
    }

    const highPrice = () => {
        setSort(products.sort((a, b) => b.price - a.price))
    }
    const rate = () => {
        const averRating = (arr) => {
            return arr.reduce((prev, curr, i) => prev + curr[i], 0) / arr.length
        }
        setSort(products.sort((a, b) => averRating(b.reviews) - averRating(a.reviews)))
    }
    const discount = () => {
        setSort(products.sort((a, b) => b.discount - a.discount))
    }

    return <div className={styles.wrapper}>
        <span onClick={popular}>Популярные</span>
        <span onClick={newest}>Новинки</span>
        <span onClick={lowPrice}>Сначала дешёвые</span>
        <span onClick={highPrice}>Сначала дорогие</span>
        <span onClick={rate}>По рейтингу</span>
        <span onClick={discount}>По скидке</span>
    </div>
}