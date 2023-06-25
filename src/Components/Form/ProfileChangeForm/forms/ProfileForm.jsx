import React, {memo} from "react";
import styles from "../profile.module.css";
import {fetchChangeProfile} from "../../../../Storage/slices/userSlice";
import {useForm} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import {Input} from "../../../Input/Input";

export const ProfileForm = memo(() => {

    const dispatch = useDispatch()
    const {user} = useSelector(state => state.user)


    const {register, handleSubmit, formState: {errors}} = useForm({
        defaultValues: {
            name: user.name.split(" ")[0],
            surname: user.name.split(" ")[1],
            email: user.email,
            about: user.about,
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
            <Input type="text" name="name" nameRegister={nameRegister} register={register} placeholder="Имя"
                   errors={errors.name}/>
            <Input type="text" name="surname" nameRegister={surnameRegister} register={register} placeholder="Фамилия"
                   errors={errors.surname}/>

            <Input type="text" name="email" nameRegister={emailRegister} register={register} placeholder="Email"
                   errors={errors.email}/>
            <div className={styles.about__wrap}>
                        <textarea className={styles.about} placeholder="О себе"
                                  {...register("about", {...aboutRegister})} />
            </div>
            <button className={styles.forms__button}>Сохранить</button>
        </form>
    )
})