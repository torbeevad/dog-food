import React from "react";
import {ReactComponent as LogoTitle} from "./img/logo-title.svg"
import {ReactComponent as LogoFace} from "./img/logo-face.svg";
import styles from "./logo.module.css"

export const Logo = () => {
    return <div className={styles.logo}>
        <LogoFace className={styles.face}/>
        <LogoTitle className={styles.title}/>
    </div>
}