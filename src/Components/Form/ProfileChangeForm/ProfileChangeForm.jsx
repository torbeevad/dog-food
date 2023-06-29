import React from "react";
import styles from "./profile.module.css"
import {AvatarForm} from "./forms/AvatarForm";
import {ProfileForm} from "./forms/ProfileForm";
import {PassForm} from "./forms/PassForm";
import {Back} from "../../Back/Back";
import {useSelector} from "react-redux";

export const ProfileChangeForm = () => {

    const {user} = useSelector(state => state.user)

    return (
        <div className={styles.wrapper}>
            <Back/>
            <div className={styles.top__wrapper}>
                <h3>Мои данные</h3>
                {!!Object.keys(user).length &&
                    <>
                        <AvatarForm/>
                        <ProfileForm/>
                    </>
                }
            </div>
            <PassForm/>
        </div>
    )
}