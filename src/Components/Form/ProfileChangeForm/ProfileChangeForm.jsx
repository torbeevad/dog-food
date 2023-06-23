import React from "react";
import styles from "./profile.module.css"
import {useNavigate} from "react-router";
import {AvatarForm} from "./forms/AvatarForm";
import {ProfileForm} from "./forms/ProfileForm";
import {PassForm} from "./forms/PassForm";

export const ProfileChangeForm = () => {

    const navigate = useNavigate()

    const back = () => {
        navigate(-1)
    }

    return (
        <div className={styles.wrapper}>
            <span className={styles.back} onClick={back}>Назад</span>
            <div className={styles.top__wrapper}>
                <h3>Мои данные</h3>
                <AvatarForm/>
                <ProfileForm/>
            </div>
            <PassForm/>
        </div>
    )
}