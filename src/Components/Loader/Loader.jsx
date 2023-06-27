import React from "react";
import styles from "./index.module.css"

export const Loader = () => {

    return (
        <div className={styles.wrapper__loader}>
            <span className={styles.loader}></span>
        </div>
    )
}