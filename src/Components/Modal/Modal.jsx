import React, {useCallback} from "react";
import styles from "./modal.module.css"
import {ReactComponent as Close} from "../../assets/Close.svg";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {setModalActive} from "../../Storage/slices/userSlice";

export const Modal = ({children}) => {

    const dispatch = useDispatch()
    const {isActiveModal} = useSelector(state => state.user)
    const {isLogin} = useSelector(state => state.user)

    const handleKeyDown = useCallback((e) => {
        e.key === isLogin && "Escape" && dispatch(setModalActive(false))
    }, [dispatch, isLogin])

    return <div tabIndex={1} onKeyDown={handleKeyDown}
                className={isActiveModal ? styles.active : styles.modal}>
        <div className={styles.content}>
            <Link to="/"><span onClick={() => {
                dispatch(setModalActive(false))
            }} className={styles.close}>{isLogin && <Close/>}</span></Link>
            {children}
        </div>
    </div>
}