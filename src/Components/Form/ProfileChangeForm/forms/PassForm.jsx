import React from "react";
import styles from "../profile.module.css";
import {useForm} from "react-hook-form";

export const PassForm = () => {

    const {register, handleSubmit, formState: {errors}} = useForm()

    const changePass = async (data) => {

    }

    const passwordRegister = {
        required: {
            value: false,
            message: "Введите пароль"
        },
        pattern: {
            value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/gm,
            message: "Пароль должен быть не менее 8 символов, содержать заглавную букву и цифру"
        }
    }

    return (
            <div className={styles.bottom__wrapper}>
                <h4>Изменить пароль</h4>
                <form className={styles.bottom}  onSubmit={handleSubmit(changePass)}>
                    <div>
                        <input className={styles.input} placeholder="Старый Пароль"
                               type="password" {...register("password", {...passwordRegister})} />
                        <span>{errors?.password && errors?.password.message}</span>
                    </div>
                    <div>
                        <input className={styles.input} placeholder="Новый Пароль"
                               type="password" {...register("password", {...passwordRegister})} />
                        <span>{errors?.password && errors?.password.message}</span>
                    </div>
                    <button className={styles.forms__button} type="submit">Сохранить</button>
                </form>
            </div>
    )
}