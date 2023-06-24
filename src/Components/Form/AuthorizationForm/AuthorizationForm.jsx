import React from "react";
import {useForm} from "react-hook-form";
import styles from "./authotization.module.css"
import {Link} from "react-router-dom";
import {useNavigate} from "react-router";
import {useDispatch} from "react-redux";
import {fetchGetAuthorization, modalActive} from "../../../Storage/slices/userSlice";
import {notification} from "antd";

export const AuthorizationForm = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()


    const {register, handleSubmit, formState: {errors}, reset} = useForm()


    const authorization = async (data) => {
        await dispatch(fetchGetAuthorization(data))
        setTimeout(() => {
            navigate("/")
            dispatch(modalActive(false))
            reset()
        }, 500)
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
        <h3 className={styles.title}>Вход</h3>
        <form className={styles.form__author} onSubmit={handleSubmit(authorization)}>
            <div className={styles.inputs}>
                <div>
                    <input className={styles.input} placeholder="Email"
                           type="text" {...register("email", {...emailRegister})} />
                    <span>{errors?.email && notification.warning({message: errors?.email.message})}</span>
                </div>
                <div>
                    <input className={styles.input} placeholder="Пароль"
                           type="password" {...register("password", {...passwordRegister})} />
                    <span>{errors?.password && notification.warning({message: errors?.password.message})}</span>
                </div>
            </div>
            <Link to="/forgot"><span className={styles.reset}>Восстановить пароль</span></Link>
            <div className={styles.buttons}>
                <button type="submit">Войти</button>
                <Link to="/registration">
                    <button className={styles.white__button}>Регистрация</button>
                </Link>
            </div>
        </form>
    </div>
}