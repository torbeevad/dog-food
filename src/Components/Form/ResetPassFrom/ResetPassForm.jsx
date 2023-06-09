import React, {useContext} from "react";
import {useForm} from "react-hook-form";
import styles from "./reset.module.css"
import {resetPassword} from "../../../Utils/api";
import {ValueContext} from "../../../ValueContext/ValueContext";

export const ResetPassForm = () => {

    const {setActiveModal} = useContext(ValueContext)

    const {register, handleSubmit, formState: {errors}} = useForm()

    const resetPass = (data) => {
        resetPassword(data).then(() => setTimeout(() => {
            setActiveModal(false);
        }, 2000))
    }

    return <div className={styles.wrap}>
        <h3 className={styles.title}>Восстановление пароля</h3>
        <span>Для получения временного пароля необходимо ввести<br/> email, указанный при регистрации.</span>
        <form onSubmit={handleSubmit(resetPass)}>
            <div className={styles.inputs}>
                <div>
                    <input className={styles.input} placeholder="Email"
                           type="text" {...register("email", {required: true})} />
                    {errors?.email && <span>{errors.email.message}</span>}
                </div>
            </div>
            <span>Срок действия временного пароля 24 ч.</span>
            <div className={styles.buttons}>
                <button>Отправить</button>
            </div>
        </form>
    </div>
}