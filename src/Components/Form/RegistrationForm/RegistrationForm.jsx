import React, {useContext} from "react";
import {useForm} from "react-hook-form";
import styles from "./registration.module.css"
import {getRegistration} from "../../../Utils/api";
import {ValueContext} from "../../../ValueContext/ValueContext";
import {Link} from "react-router-dom";

export const RegistrationForm = () => {

    const {setActiveModal} = useContext(ValueContext)

    const {register, handleSubmit, formState: {errors}, reset} = useForm()

    const registration = async (data) => {
        await getRegistration(data).catch(e => console.log(e))
        reset();
        setTimeout(() => {
            setActiveModal(false);
        }, 2000)
    }

    return <div className={styles.wrap}>
        <h3 className={styles.title}>Регистрация</h3>
        <form className={styles.form__register} onSubmit={handleSubmit(registration)}>
            <div className={styles.inputs}>
                <div>
                    <input className={styles.input} placeholder="Email"
                           type="text" {...register("email", {required: "Введите Email"})} />
                    {errors?.email && <span>{errors?.email.message}</span>}
                </div>
                <div>
                    <input className={styles.input} placeholder="Пароль"
                           type="password" {...register("password", {required: "Введите пароль"})} />
                    {errors?.password && <span>{errors?.password.message}</span>}
                </div>
            </div>
            <p>Регистрируясь на сайте, вы соглашаетесь с нашими<br/>
                Правилами и Политикой конфиденциальности и<br/>
                соглашаетесь на информационную рассылку.</p>
            <div className={styles.buttons}>
                <button type="submit">Зарегистрироваться</button>
                <Link to="/authorization"><button className={styles.white__button}>Войти</button></Link>
            </div>
        </form>
    </div>
}