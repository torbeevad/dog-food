import React from "react";
import styles from "./index.module.css";
import {notification} from "antd";

export const Input = ({type, name, register, nameRegister, placeholder, errors}) => {

    return (
        <>
            <input className={styles.input} placeholder={placeholder}
                   type={type} {...register(name, {...nameRegister})} />
            {errors && notification.warning({message: errors.message, duration: 2,})}
        </>
    )
}