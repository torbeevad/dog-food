import React, {useContext} from "react";
import {useForm} from "react-hook-form";
import styles from "./authotization.module.css"
import {ValueContext} from "../../../ValueContext/ValueContext";
import {Link} from "react-router-dom";
import {useNavigate} from "react-router";
import {useDispatch, useSelector} from "react-redux";
import {getAuthorization} from "../../../Storage/slices/userSlice";

export const AuthorizationForm = () => {

    const dispatch = useDispatch()

    const {isLogin} = useSelector(state => state.user)

    const navigate = useNavigate()

    const {setActiveModal} = useContext(ValueContext)

    const {register, handleSubmit, formState: {errors}, reset} = useForm()


    const authorization = async (data) => {
       await dispatch(getAuthorization(data))
        setTimeout(() => {
            navigate("/")
            setActiveModal(false)
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
                    <span>{errors?.email && errors?.email.message}</span>
                </div>
                <div>
                    <input className={styles.input} placeholder="Пароль"
                           type="password" {...register("password", {...passwordRegister})} />
                    <span>{errors?.password && errors?.password.message}</span>
                </div>
            </div>
            <Link to="/reset"><span className={styles.reset}>Восстановить пароль</span></Link>
            <div className={styles.buttons}>
                <button type="submit">Войти</button>
                <Link to="/registration">
                    <button className={styles.white__button}>Регистрация</button>
                </Link>
            </div>
        </form>
    </div>
}