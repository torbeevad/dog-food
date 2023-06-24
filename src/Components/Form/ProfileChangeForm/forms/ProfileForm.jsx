import React from "react";
import styles from "../profile.module.css";
import {fetchChangeProfile} from "../../../../Storage/slices/userSlice";
import {useForm} from "react-hook-form";
import {useDispatch} from "react-redux";

export const ProfileForm = () => {

    const dispatch = useDispatch()
    const userFromLocal = JSON.parse(localStorage.getItem("user"))


    const {register, handleSubmit, formState: {errors}} = useForm({
        defaultValues: {
            name: userFromLocal.name.split(" ")[0],
            surname: userFromLocal.name.split(" ")[1],
            email: userFromLocal.email,
            about: userFromLocal.about,
        }
    })

    const nameRegister = {
        required: {
            value: true,
            message: "Введите имя"
        },
        pattern: {
            value: /^[а-яА-ЯёЁ]+$/g,
            message: "Не корректное имя"
        }
    }

    const surnameRegister = {
        required: {
            value: true,
            message: "Введите фамилию"
        },
        pattern: {
            value: /^[а-яА-ЯёЁ]+$/g,
            message: "Не корректная фамилия"
        }
    }

    const aboutRegister = {
        required: {
            value: false,
            message: ""
        },
        pattern: {}
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

    const changeProfile = async (data) => {
        const senData = {
            name: data.name + " " + data.surname,
            about: data.about,
        }
        delete data.surname
        await dispatch(fetchChangeProfile(senData))
    }

    return (
        <form className={styles.top} onSubmit={handleSubmit(changeProfile)}>
            <div>
                <input className={styles.input} placeholder="Имя"
                       type="text" {...register("name", {...nameRegister})} />
                <span>{errors?.name && errors?.name.message}</span>
            </div>
            <div>
                <input className={styles.input} placeholder="Фамилия"
                       type="text" {...register("surname", {...surnameRegister})} />
                <span>{errors?.surname && errors?.surname.message}</span>
            </div>
            <div>
                <input className={styles.input} placeholder="Email"
                       type="text" {...register("email", {...emailRegister})} />
                <span>{errors?.email && errors?.email.message}</span>
            </div>
            <div className={styles.about__wrap}>
                        <textarea className={styles.about} placeholder="О себе"
                                  {...register("about", {...aboutRegister})} />
            </div>
            <button className={styles.forms__button}>Сохранить</button>
        </form>
    )
}