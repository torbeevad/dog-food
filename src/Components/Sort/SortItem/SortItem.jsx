import React from "react";
import cn from "classnames";
import styles from "./sort-item.module.css"

export const SortItem = ({children, activeSortItem, ...props}) => {

    const {item, black} = styles

    const [isActive] = props.isActive
    const [id] = props.id

    return <span onClick={activeSortItem} id={[id]} className={cn(item, {[black]: isActive === id})}>{children}</span>
}