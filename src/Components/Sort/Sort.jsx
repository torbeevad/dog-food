import React, {useCallback, useState} from "react";
import styles from "./sort.module.css";
import {useDispatch} from "react-redux";
import {sortProducts} from "../../Storage/slices/productsSlice";
import {SortItem} from "./SortItem/SortItem";



export const Sort = () => {

    const [isActive, setActive] = useState("");
    const dispatch = useDispatch()

    const arrSortNames = [
        {"popular": "Популярные"},
        {"newest": "Новинки"},
        {"lowPrice": "Сначала дешёвые"},
        {"highPrice": "Сначала дорогие"},
        {"rate": "По рейтингу"},
        {"discount": "По скидке"},
    ]

    const activeSortItem = useCallback((e) => {
        setActive([e.target.id]);
    }, [])

    const sortChoose = (e) => {
        dispatch(sortProducts(e.target.id))
    }

    return <div onClick={sortChoose} className={styles.wrapper}>
        {arrSortNames.map(item => <SortItem activeSortItem={activeSortItem} isActive={isActive} key={Object.keys(item)} id={Object.keys(item)} children={Object.values(item)}/>)}
    </div>
}