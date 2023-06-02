import React from "react";
import {ReactComponent as LogoDF} from "./logo-dog-food.svg"
import styles from "./logo.module.css"

export const Logo = () => {
    return <LogoDF className={styles.logo} />
}