import React, {useCallback, useContext} from "react";
import styles from "./modal.module.css"
import {ReactComponent as Close} from "./img/Close.svg";
import {ValueContext} from "../../ValueContext/ValueContext";
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";

export const Modal = ({children}) => {

    const {activeModal, setActiveModal} = useContext(ValueContext)
    const {isLogin} = useSelector(state => state.user)

    const handleKeyDown = useCallback((e) => {
        e.key === isLogin && "Escape" && setActiveModal(false)
    }, [isLogin, setActiveModal])

    return <div tabIndex={1} onKeyDown={handleKeyDown}
                className={activeModal ? styles.active : styles.modal}>
        <div className={styles.content}>
            <Link to="/"><span onClick={() => {
                setActiveModal(false)
            }} className={styles.close}>{isLogin && <Close/>}</span></Link>
            {children}
        </div>
    </div>
}