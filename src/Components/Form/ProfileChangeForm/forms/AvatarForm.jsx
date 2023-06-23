import React from "react";
import styles from "../profile.module.css";
import {fetchChangeAvatar} from "../../../../Storage/slices/userSlice";
import {useForm} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";

export const AvatarForm = () => {

    const dispatch = useDispatch()
    const {user} = useSelector(state => state.user)
    const {register, handleSubmit, formState: {errors}} = useForm()

    const avatarRegister = {
        required: {
            value: false,
            message: "Введите url"
        },
        pattern: {
        }
    }

    const sendAvatar = async (data) => {
        await dispatch(fetchChangeAvatar({avatar: data.avatar}))
    }

    return (
        <>
            <form className={styles.form__avatar} onSubmit={handleSubmit(sendAvatar)}>
                <img className={styles.avatar} src={user.avatar} alt="avatar"/>
                <div>
                    <input className={styles.input} placeholder="url фото"
                           type="text" {...register("avatar", {...avatarRegister})} />
                    <span>{errors?.avatar && errors?.avatar.message}</span>
                </div>
                <button className={styles.avatar__button} type="submit">Сохранить</button>
            </form>
        </>
    )
}