import React, {useCallback, useContext} from "react";
import styles from "./modal.module.css"
import {ReactComponent as Close} from "./img/Close.svg";
import {ValueContext} from "../../ValueContext/ValueContext";

export const Modal = ({children}) => {

    const {activeModal, setActiveModal} = useContext(ValueContext)

    const handleKeyDown = useCallback((e) => {
        e.key === "Escape" && setActiveModal(false)
    }, [setActiveModal])


    return <div tabIndex={1} onKeyDown={handleKeyDown}
                className={activeModal ? styles.active : styles.modal}>
        <div className={styles.content}>
            <span onClick={() => {
                setActiveModal(false)
            }} className={styles.close}><Close/></span>
            {children}
        </div>
    </div>
}