import React, {memo} from "react";
import styles from "../profile.module.css";
import {fetchChangeAvatar} from "../../../../Storage/slices/userSlice";
import {useForm} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import {Input} from "../../../Input/Input";
import {Button} from "../../../Button/Button";

export const AvatarForm = memo(() => {

    const dispatch = useDispatch()
    const {user} = useSelector(state => state.user)
    const {register, handleSubmit, formState: {errors}, reset} = useForm()

    const avatarRegister = {
        required: {
            value: false,
            message: "Введите url"
        },
        pattern: {}
    }

    const sendAvatar = async (data) => {
        await dispatch(fetchChangeAvatar({avatar: data.avatar}))
        reset()
    }

    return (
        <>
            <form className={styles.form__avatar} onSubmit={handleSubmit(sendAvatar)}>
                <img className={styles.avatar} src={user.avatar} alt="avatar"/>
                <Input type="text" name="avatar" nameRegister={avatarRegister} register={register}
                       placeholder="url фото"
                       errors={errors.avatar}/>
                <button className={styles.avatar__button} type="submit">Сохранить</button>
            </form>
        </>
    )
})