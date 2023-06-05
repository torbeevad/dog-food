import React, {useState} from "react";
import styles from "./sort.module.css"

export const Sort = ({products, setProducts}) => {

    const [isActive, setActive] = useState({});
    const activeSortItem = (e) => {
        if (!e.target.id) return;
        setActive(e.target);
        if (isActive !== e.target.id) {
            e.target.className = styles.itemBlack;
            isActive.className = styles.item;
        }
    }

    const averRating = (arr) => {
        if (!arr.length) {
            return 0
        }
        return arr.reduce((acc, prev) => acc + prev.rating, 0) / arr.length;
    }


    const popular = () => {
        const result = products.sort((a, b) => b.likes.length - a.likes.length)
        setProducts([...result])
    }

    const newest = () => {
        const result = products.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
        setProducts([...result])
    }

    const lowPrice = () => {
        const result = products.sort((a, b) => (a.price - a.price / 100 * a.discount) - (b.price - b.price / 100 * b.discount))
        setProducts([...result])
    }

    const highPrice = () => {
        const result = products.sort((a, b) => b.price - a.price)
        setProducts([...result])
    }
    const rate = () => {
        const result = products.sort((a, b) => averRating(b.reviews) - averRating(a.reviews))
        setProducts([...result])
    }
    const discount = () => {
        const result = products.sort((a, b) => b.discount - a.discount)
        setProducts([...result])
    }

    return <div onClick={activeSortItem} className={styles.wrapper}>
        <span onClick={popular} id={1} className={styles.item}>Популярные</span>
        <span onClick={newest} id={2} className={styles.item}>Новинки</span>
        <span onClick={lowPrice} id={3} className={styles.item}>Сначала дешёвые</span>
        <span onClick={highPrice} id={4} className={styles.item}>Сначала дорогие</span>
        <span onClick={rate} id={5} className={styles.item}>По рейтингу</span>
        <span onClick={discount} id={6} className={styles.item}>По скидке</span>
    </div>
}