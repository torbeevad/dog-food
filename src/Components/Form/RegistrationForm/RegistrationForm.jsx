import React, {useContext} from "react";
import {useForm} from "react-hook-form";
import styles from "./registration.module.css"
import {getRegistration} from "../../../Utils/api";
import {ValueContext} from "../../../ValueContext/ValueContext";
import {AuthorizationForm} from "../AuthorizationForm/AuthorizationForm";

export const RegistrationForm = () => {

    const {setActiveModal, setChildrenForm} = useContext(ValueContext)

    const {register, handleSubmit, formState: {errors}} = useForm()

    const registration = (data) => {
        getRegistration(data).then(() => setTimeout(() => {
            setActiveModal(false);
        }, 2000))
    }

    return <div className={styles.wrap}>
        <h3 className={styles.title}>Регистрация</h3>
        <form onSubmit={handleSubmit(registration)}>
            <div className={styles.inputs}>
                <div>
                    <input className={styles.input} placeholder="Email"
                           type="text" {...register("email", {required: "Введите Email"})} />
                    {errors?.email && <span>{errors.email.message}</span>}
                </div>
                <div>
                    <input className={styles.input} placeholder="Пароль"
                           type="password" {...register("password", {required: "Введите пароль"})} />
                    {errors.password && <span>{errors.password.message}</span>}
                </div>
            </div>
            <p>Регистрируясь на сайте, вы соглашаетесь с нашими<br/>
                Правилами и Политикой конфиденциальности и<br/>
                соглашаетесь на информационную рассылку.</p>
            <div className={styles.buttons}>
                <button type="submit">Зарегистрироваться</button>
                <button className={styles.white__button} onClick={() => {
                    setChildrenForm(<AuthorizationForm/>)
                }}>Войти
                </button>
            </div>
        </form>
    </div>
}