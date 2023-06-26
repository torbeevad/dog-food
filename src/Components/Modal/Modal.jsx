import React from "react";
import styles from "./modal.module.css"
import {useSelector} from "react-redux";

export const Modal = ({children}) => {

    const {isActiveModal} = useSelector(state => state.user)

    return <div className={isActiveModal ? styles.active : styles.modal}>
        <div className={styles.content}>
            {children}
        </div>
    </div>
}