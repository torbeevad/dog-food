import React from "react";
import styles from "./index.module.css";
import {NavLink} from "react-router-dom";
import {setModalActive, setIsLogin} from "../../Storage/slices/userSlice";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router";
import {ReactComponent as Phone} from "../../assets/Phone.svg";
import {ReactComponent as Mail} from "../../assets/Mail.svg";

export const ProfileDescription = () => {

    const {user} = useSelector(state => state.user)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const exitFn = () => {
        localStorage.removeItem("token");
        dispatch(setIsLogin(false))
        dispatch(setModalActive(true))
        navigate("/authorization")
    }

    return (
        <>
            <h3 className={styles.profile__title}>Профиль</h3>
            <img className={styles.profile__avatar} src={user.avatar} alt="avatar"/>
            <span className={styles.profile__name}>{user.name}</span>
            <div className={styles.profile__contacts}>
                <div className={styles.profile__frame}>
                    <Phone/>
                    <a className={styles.profile__phone}
                       href="tel:+79001234567">{!user.contactphone && "+79001234567"}</a>
                </div>
                <div className={styles.profile__frame}>
                    <Mail/>
                    <a className={styles.profile__mail}
                       href={`mailto:${user.email}?subject=Вопрос по HTML`}>{user.email}</a>
                </div>
            </div>
            <p className={styles.profile__about}>{user.about}</p>
            <NavLink to={"/change"} className={styles.profile__button__change}>
                <button className={styles.profile__button__change}>Изменить</button>
            </NavLink>
            <NavLink to={"/"} className={styles.profile__button__home}>
                <button className={styles.profile__button__home}>На главную</button>
            </NavLink>
            <NavLink to={"/"} className={styles.profile__button__logout}>
                <button onClick={exitFn} className={styles.profile__button__logout}>Выйти</button>
            </NavLink>
        </>
    )
}