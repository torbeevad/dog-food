import React from "react";
import styles from "../Product/product.module.css";
import {useNavigate} from "react-router";

export const Back = () => {

    const navigate = useNavigate()

    const back = () => {
        navigate(-1)
    }

    return (
        <>
            <span className={styles.back} onClick={back}>Назад</span>
        </>
    )
}