import React from "react";
import styles from "./query.module.css"

export const QueryFind = ({search, cards}) => {

    return <div className={search ? styles.query : styles.hide}>По запросу <b>{search}</b> найдено {cards.length} товаров</div>
}