import React from "react";
import {useForm} from "react-hook-form";
import styles from "./registration.module.css"
import {Link} from "react-router-dom";
import {useDispatch} from "react-redux";
import {fetchGetRegistration} from "../../../Storage/slices/userSlice";
import {Button} from "../../Button/Button";
import {Input} from "../../Input/Input";

export const RegistrationForm = () => {

    const dispatch = useDispatch()

    const {register, handleSubmit, formState: {errors}, reset} = useForm()

    const registration = async (data) => {
        await dispatch(fetchGetRegistration(data))
        reset();
    }

    const emailRegister = {
        required: {
            value: true,
            message: "Введите Email"
        },
        pattern: {
            value: /\w+@\w+.ru|com/gm,
            message: "Не похоже на Email..."
        }
    }

    const passwordRegister = {
        required: {
            value: true,
            message: "Введите пароль"
        },
        pattern: {
            value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/gm,
            message: "Пароль должен быть не менее 8 символов, содержать заглавную букву и цифру"
        }
    }


    return <div className={styles.wrap}>
        <h3 className={styles.title}>Регистрация</h3>
        <form className={styles.form__register}>
            <div className={styles.inputs}>
                <Input name={"email"} type={"text"} placeholder={"Email"} register={register}
                       nameRegister={emailRegister} errors={errors.email}/>
                <Input name={"password"} type={"password"} placeholder={"Пароль"} register={register}
                       nameRegister={passwordRegister} errors={errors.password}/>
            </div>
            <p>Регистрируясь на сайте, вы соглашаетесь с нашими<br/>
                Правилами и Политикой конфиденциальности и<br/>
                соглашаетесь на информационную рассылку.</p>
            <div className={styles.buttons}>
                <Button onClick={handleSubmit(registration)} children={"Зарегестрироваться"} color={"yellow"}/>
                <Link to="/authorization">
                    <button className={styles.white__button}>Войти</button>
                </Link>
            </div>
        </form>
    </div>
}