import React, {useContext} from "react";
import styles from "./query.module.css"
import {ValueContext} from "../../ValueContext/ValueContext";

export const QueryFind = ({cards}) => {

    const {search} = useContext(ValueContext)

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

    return <div className={search ? styles.query : styles.hide}>
        {!cards.length
            ?
            <span>По запросу <b>{search}</b> {prodStr} {findStr}!</span>
            :
            <span>По запросу <b>{search}</b> {findStr} {cards.length} {prodStr}:</span>
        }
    </div>
}