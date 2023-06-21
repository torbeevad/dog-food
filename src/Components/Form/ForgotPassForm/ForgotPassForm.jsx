import React from "react";
import {useForm} from "react-hook-form";
import styles from "../ForgotPassForm/forgot.module.css"
import {Link} from "react-router-dom";
import {fetchForgotPassword} from "../../../Storage/slices/userSlice";
import {useNavigate} from "react-router";
import {useDispatch} from "react-redux";

export const ForgotPassForm = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const {register, handleSubmit, formState: {errors}, reset} = useForm()

    const forgotPass = async (data) => {
        await dispatch(fetchForgotPassword(data))
        setTimeout(() => {
            navigate("/reset")
        }, 300)
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

    return <div className={styles.wrap}>
        <h3 className={styles.title}>Восстановление пароля</h3>
        <form className={styles.form__forgot} onSubmit={handleSubmit(forgotPass)}>
            <span>Для получения временного пароля необходимо ввести email, указанный при регистрации.</span>
            <div className={styles.inputs}>
                <div>
                    <input className={styles.input} placeholder="Email"
                           type="text" {...register("email", {...emailRegister})} />
                    {errors?.email && <span>{errors?.email.message}</span>}
                </div>
            </div>
            <span>Срок действия временного пароля 24 ч.</span>
            <div className={styles.buttons}>
                <button>Отправить</button>
                <Link to="/authorization">
                    <button className={styles.white__button}>Войти</button>
                </Link>
            </div>
        </form>
    </div>
}