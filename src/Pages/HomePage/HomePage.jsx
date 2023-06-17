import React from "react";
import {Link} from "react-router-dom";
import styles from "./index.module.css"

export const HomePage = () => {

    return (
        <Link className={styles.link} to={"/catalog"}>
            <button className="home-page-button">Каталог&nbsp;></button>
        </Link>
    )
}