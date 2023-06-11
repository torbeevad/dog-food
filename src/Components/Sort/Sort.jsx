import React, {useCallback, useState} from "react";
import styles from "./sort.module.css";

export const Sort = ({cards, setFunc}) => {

    const [isActive, setActive] = useState({});
    const activeSortItem = useCallback((e) => {
        if (!e.target.id) return;
        setActive(e.target);
        if (isActive !== e.target.id) {
            e.target.className = styles.itemBlack;
            isActive.className = styles.item;
        }
    }, [isActive])

    const sortByDate = useCallback((arr) => {
        return arr.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
    }, [])

    const averRating = useCallback((arr) => {
        if (!arr.length) {
            return 0
        }
        return arr.reduce((acc, prev) => acc + prev.rating, 0) / arr.length;
    }, [])

    const popular = useCallback(() => {
        const result = cards.sort((a, b) => b.likes.length - a.likes.length)
        setFunc([...result])
    }, [cards, setFunc])

    const newest = useCallback(() => {
        const result = sortByDate(cards)
        setFunc([...result])
    }, [sortByDate, cards, setFunc])

    const lowPrice = useCallback(() => {
        const result = cards.sort((a, b) => (a.price - a.price / 100 * a.discount) - (b.price - b.price / 100 * b.discount))
        setFunc([...result])
    }, [cards, setFunc])

    const highPrice = useCallback(() => {
        const result = cards.sort((a, b) => b.price - a.price)
        setFunc([...result])
    }, [cards, setFunc])

    const rate = useCallback(() => {
        const result = cards.sort((a, b) => averRating(b.reviews) - averRating(a.reviews))
        setFunc([...result])
    }, [averRating, cards, setFunc])

    const discount = useCallback(() => {
        const result = cards.sort((a, b) => b.discount - a.discount)
        setFunc([...result])
    }, [cards, setFunc])

    return <div onClick={activeSortItem} className={styles.wrapper}>
        <span onClick={popular} id={1} className={styles.item}>Популярные</span>
        <span onClick={newest} id={2} className={styles.item}>Новинки</span>
        <span onClick={lowPrice} id={3} className={styles.item}>Сначала дешёвые</span>
        <span onClick={highPrice} id={4} className={styles.item}>Сначала дорогие</span>
        <span onClick={rate} id={5} className={styles.item}>По рейтингу</span>
        <span onClick={discount} id={6} className={styles.item}>По скидке</span>
    </div>
}