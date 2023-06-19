import React from "react";
import {useSelector} from "react-redux";
import {Link} from "react-router-dom";
import styles from "./profile.module.css"
import {useNavigate} from "react-router";

export const Profile = () => {

    const {user} = useSelector(s => s.user)
    const navigate = useNavigate()

    const exitFn = () => {
        localStorage.removeItem("token");
        navigate("/")
    }

    return (
        <div className={styles.wrapper}>
            <h3>{user.name}</h3>
            <img className={styles.profile__avatar} src={user.avatar} alt="avatar"/>
            <h4>ABOUT</h4>
            <span>{user.about}</span>
            <Link to={"/"} className={styles.profile__link}>
                <button className={styles.profile__link}>На главную</button>
            </Link>
            <button onClick={exitFn} className={styles.profile__link}>Выйти</button>
        </div>
    )
}