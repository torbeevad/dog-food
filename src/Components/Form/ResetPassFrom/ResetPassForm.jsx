import React, {useContext} from "react";
import {useForm} from "react-hook-form";
import styles from "./reset.module.css"
import {resetPassword} from "../../../Utils/api";
import {ValueContext} from "../../../ValueContext/ValueContext";

export const ResetPassForm = () => {

    const {setActiveModal} = useContext(ValueContext)

    const {register, handleSubmit, formState: {errors}, reset} = useForm()

    const resetPass = async (data) => {
        await resetPassword(data).catch(e => console.log(e))
        reset();
        setTimeout(() => {
            setActiveModal(false);
        }, 2000)
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
        <span>Для получения временного пароля необходимо ввести<br/> email, указанный при регистрации.</span>
        <form className={styles.form__reset} onSubmit={handleSubmit(resetPass)}>
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
            </div>
        </form>
    </div>
}