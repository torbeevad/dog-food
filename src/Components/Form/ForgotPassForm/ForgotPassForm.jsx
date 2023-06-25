import React from "react";
import {useForm} from "react-hook-form";
import styles from "../ForgotPassForm/forgot.module.css"
import {Link} from "react-router-dom";
import {fetchForgotPassword} from "../../../Storage/slices/userSlice";
import {useNavigate} from "react-router";
import {useDispatch} from "react-redux";
import {Button} from "../../Button/Button";
import {Input} from "../../Input/Input";

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
        <form className={styles.form__forgot}>
            <span>Для получения временного пароля необходимо ввести email, указанный при регистрации.</span>
            <div className={styles.inputs}>
                <div>
                    <Input type="text" name="email" nameRegister={emailRegister} register={register} placeholder="Email"
                           errors={errors.email}/>
                </div>
            </div>
            <span>Срок действия временного пароля 24 ч.</span>
            <div className={styles.buttons}>


                <Button onClick={handleSubmit(forgotPass)} children={"Отправить"} color={"yellow"}/>
                <Link to="/authorization">
                    <button className={styles.white__button}>Войти</button>
                </Link>
            </div>
        </form>
    </div>
}