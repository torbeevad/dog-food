import React, {useContext} from "react";
import {useForm} from "react-hook-form";
import styles from "./authotization.module.css"
import {getEnter} from "../../../Utils/api";
import {ValueContext} from "../../../ValueContext/ValueContext";
import {RegistrationForm} from "../RegistrationForm/RegistrationForm";
import {ResetPassForm} from "../ResetPassFrom/ResetPassForm";

export const AuthorizationForm = () => {

    const {setActiveModal, setChildrenForm} = useContext(ValueContext)

    const {register, handleSubmit, formState: {errors}, reset} = useForm()

    const authorization = (data) => {
        getEnter(data).then(() => setTimeout(() => {
            reset();
            setActiveModal(false);
        }, 2000)).catch(e=>console.log(e))
    }

    return <div className={styles.wrap}>
        <h3 className={styles.title}>Вход</h3>
        <form className={styles.form__author} onSubmit={handleSubmit(authorization)}>
            <div className={styles.inputs}>
                <div><input className={styles.input} placeholder="Email"
                            type="text" {...register("email", {required: true})} />
                    {errors?.email && <span>{errors?.email.message}</span>}
                </div>
                <div><input className={styles.input} placeholder="Пароль"
                            type="password" {...register("password", {required: true})} />
                    {errors?.password && <span>{errors?.password.message}</span>}
                </div>
            </div>
            <span className={styles.reset} onClick={() => setChildrenForm(<ResetPassForm/>)}>Восстановить пароль</span>
            <div className={styles.buttons}>
                <button type="submit">Войти</button>
                <button className={styles.white__button} onClick={() => {
                    setChildrenForm(<RegistrationForm/>)
                }}>Регистрация
                </button>
            </div>
        </form>
    </div>
}