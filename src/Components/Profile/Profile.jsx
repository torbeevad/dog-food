import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";
import styles from "./profile.module.css"
import {useNavigate} from "react-router";
import {setIsLogin} from "../../Storage/slices/userSlice";
import {ReactComponent as Phone} from "./img/Phone.svg";
import {ReactComponent as Mail} from "./img/Mail.svg";

export const Profile = () => {

    const {user} = useSelector(s => s.user)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const exitFn = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        localStorage.removeItem("auth");
        dispatch(setIsLogin(false))
        navigate("/authorization")
    }

    return (
        <div className={styles.profile__wrapper}>
            <div className={styles.profile__data}>
                <h3 className={styles.profile__title}>Профиль</h3>
                <div className={styles.profile__content}>
                    <img className={styles.profile__avatar} src={user.avatar} alt="avatar"/>
                    <span className={styles.profile__name}>{user.name}</span>
                    <div className={styles.profile__contancts}>
                        <div className={styles.profile__frame}>
                            <Phone/>
                            <a className={styles.profile__phone}
                               href="tel:+79001234567">{!user.contactphone && "+79001234567"}</a>
                        </div>
                        <div className={styles.profile__frame}>
                            <Mail/>
                            <a className={styles.profile__mail} href={`mailto:${user.email}?subject=Вопрос по HTML`}>{user.email}</a>
                        </div>
                    </div>
                    <p className={styles.profile__about}>{user.about}</p>
                    <Link to={"/change"}>
                        <button className={styles.profile__button}>Изменить</button>
                    </Link>
                </div>
                <div className={styles.profile__buttons}>
                    <Link to={"/"}>
                        <button className={styles.profile__button}>На главную</button>
                    </Link>
                    <Link to={"/"}>
                        <button onClick={exitFn} className={styles.profile__button}>Выйти</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}