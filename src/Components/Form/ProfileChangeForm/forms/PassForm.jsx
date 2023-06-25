import React, {memo} from "react";
import styles from "../profile.module.css";
import {useForm} from "react-hook-form";
import {Input} from "../../../Input/Input";

export const PassForm = memo(() => {

    const {register, handleSubmit, formState: {errors}} = useForm()

    const changePass = async (data) => {

    }

    const passwordRegister = {
        required: {
            value: false,
            message: "Введите пароль"
        },
        pattern: {
            value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/gm,
            message: "Пароль должен быть не менее 8 символов, содержать заглавную букву и цифру"
        }
    }

    return (
        <div className={styles.bottom__wrapper}>
            <h4>Изменить пароль</h4>
            <form className={styles.bottom} onSubmit={handleSubmit(changePass)}>
                <Input type="password" name="password" nameRegister={passwordRegister} register={register}
                       placeholder="Старый Пароль" errors={errors.password}/>
                <Input type="password" name={"password"} nameRegister={passwordRegister} register={register}
                       placeholder={"Новый Пароль"} errors={errors.password}/>
                <button className={styles.forms__button} type="submit">Сохранить</button>
            </form>
        </div>
    )
})