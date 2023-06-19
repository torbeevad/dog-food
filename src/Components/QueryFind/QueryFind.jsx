import React from "react";
import styles from "./query.module.css"
import {useSelector} from "react-redux";
import {useLocation} from "react-router";

export const QueryFind = ({cards}) => {

    const {searchValue} = useSelector(state => state.products)

    const location = useLocation()


    let findStr = ""
    let prodStr = ""
    let str = cards.length.toString()


    if (str.match(/1$/g)) {
        findStr = "найден";
        prodStr = "товар";
    }

    if (str.match(/[2-4]$/g)) {
        findStr = "найдено";
        prodStr = "товара";
    }

    if (str.match(/[0,5-9]$|1[0-9]$/g)) {
        findStr = "найдено";
        prodStr = "товаров";
    }

    if (str.match(/^0$/g)) {
        findStr = "не найдено";
        prodStr = "товаров";
    }

    return (
        <div className={location.pathname === "/cart" || searchValue ? styles.query : styles.hide}>
            {location.pathname === "/cart"
                ? <>
                    {!!cards.length && <span>В корзине <b>{cards.length}</b> {prodStr}!</span>}</>
                : <>
                    {!cards.length
                        ? <span>По запросу <b>{searchValue}</b> {prodStr} {findStr}!</span>
                        : <span>По запросу <b>{searchValue}</b> {findStr} {cards.length} {prodStr}:</span>
                    }</>
            }
        </div>
    )
}