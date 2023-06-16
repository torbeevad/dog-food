import React, {useCallback, useState} from "react";
import styles from "./sort.module.css";
import {useDispatch} from "react-redux";
import {sortProducts} from "../../Storage/slices/productsSlice";

export const Sort = () => {

    const dispatch = useDispatch()

    const [isActive, setActive] = useState({});

    const activeSortItem = useCallback((e) => {
        if (!e.target.id) return;
        setActive(e.target);
        if (isActive !== e.target.id) {
            e.target.className = styles.itemBlack;
            isActive.className = styles.item;
        }
    }, [isActive])

    const sortChoose = (e) => {
        dispatch(sortProducts(e.target.id))
    }

    return <div onClick={activeSortItem} className={styles.wrapper}>
        <span onClick={sortChoose} id={"popular"} className={styles.item}>Популярные</span>
        <span onClick={sortChoose} id={"newest"} className={styles.item}>Новинки</span>
        <span onClick={sortChoose} id={"lowPrice"} className={styles.item}>Сначала дешёвые</span>
        <span onClick={sortChoose} id={"highPrice"} className={styles.item}>Сначала дорогие</span>
        <span onClick={sortChoose} id={"rate"} className={styles.item}>По рейтингу</span>
        <span onClick={sortChoose} id={"discount"} className={styles.item}>По скидке</span>
    </div>
}