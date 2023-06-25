import React from "react";
import {useForm} from "react-hook-form";
import styles from "./reset.module.css"
import {Link} from "react-router-dom";
import {fetchResetPassword} from "../../../Storage/slices/userSlice";
import {useNavigate} from "react-router";
import {useDispatch} from "react-redux";
import {Button} from "../../Button/Button";
import {Input} from "../../Input/Input";

export const ResetPassForm = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()


    const {register, handleSubmit, formState: {errors}, reset} = useForm()

    const resetPass = async (data) => {
        await dispatch(fetchResetPassword(data))
        setTimeout(() => {
            navigate("/authorization")
        }, 300)
        reset();
    }

    const tokenRegister = {
        required: {
            value: true,
            message: "Введите Token"
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
        <h3 className={styles.title}>Восстановление пароля</h3>
        <form className={styles.form__reset}>
            <span>Введите Токен.</span>
            <div className={styles.inputs}>
                <div>
                    <Input type={"text"} name={"Token"} placeholder={"Token"} register={register}
                           nameRegister={tokenRegister} errors={errors.token}/>
                    <Input type={"password"} name={"password"} nameRegister={passwordRegister} register={register}
                           placeholder={"Пароль"} errors={errors.password}/>
                    <span>{errors?.password && errors?.password.message}</span>
                </div>
            </div>
            <span>Срок действия временного пароля 24 ч.</span>
            <div className={styles.buttons}>
                <Button onClick={handleSubmit(resetPass)} children={"Отправить"} color={"yellow"}/>
                <Link to="/authorization">
                    <button className={styles.white__button}>Войти</button>
                </Link>
            </div>
        </form>
    </div>
}