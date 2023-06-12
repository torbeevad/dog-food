import React, {useCallback, useContext} from "react";
import styles from "./modal.module.css"
import {ReactComponent as Close} from "./img/Close.svg";
import {ValueContext} from "../../ValueContext/ValueContext";
import {Link} from "react-router-dom";

export const Modal = ({children}) => {

    const {activeModal, setActiveModal} = useContext(ValueContext)

    const handleKeyDown = useCallback((e) => {
        e.key === "Escape" && setActiveModal(false)
    }, [setActiveModal])


    return <div tabIndex={1} onKeyDown={handleKeyDown}
                className={activeModal ? styles.active : styles.modal}>
        <div className={styles.content}>
            <Link to="/"><span onClick={() => {
                setActiveModal(false)
            }} className={styles.close}><Close/></span></Link>
            {children}
        </div>
    </div>
}