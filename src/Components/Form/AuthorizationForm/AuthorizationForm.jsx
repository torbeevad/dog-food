import React from "react";
import {useForm} from "react-hook-form";
import styles from "./authotization.module.css"
import {Link} from "react-router-dom";
import {useNavigate} from "react-router";
import {useDispatch} from "react-redux";
import {fetchGetAuthorization} from "../../../Storage/slices/userSlice";
import {Button} from "../../Button/Button";
import {Input} from "../../Input/Input";

export const AuthorizationForm = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()


    const {register, handleSubmit, formState: {errors}, reset} = useForm()


    const authorization = async (data) => {
        await dispatch(fetchGetAuthorization(data))
        setTimeout(() => {
            navigate("/")
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
        <form className={styles.form__author}>
            <div className={styles.inputs}>
                <Input type="text" name="email" nameRegister={emailRegister} register={register} placeholder="Email"
                       errors={errors.email}/>
                <Input type="password" name="password" nameRegister={passwordRegister} register={register}
                       placeholder="Пароль" errors={errors.password}/>
            </div>
            <Link to="/forgot"><span className={styles.reset}>Восстановить пароль</span></Link>
            <div className={styles.buttons}>
                <Button onClick={handleSubmit(authorization)} children={"Войти"} color={"yellow"}/>
                <Link to="/registration">
                    <button className={styles.white__button}>Регистрация</button>
                </Link>
            </div>
        </form>
    </div>
}