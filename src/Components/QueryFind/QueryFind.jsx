import React from "react";
import styles from "./query.module.css"

export const QueryFind = ({search, products}) => {

    let findStr = ""
    let prodStr = ""
    let str = products.length.toString()


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

    return <div className={search ? styles.query : styles.hide}>По запросу <b>{search}</b> {findStr} {products.length} {prodStr}
    </div>
}