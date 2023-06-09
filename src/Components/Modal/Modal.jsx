import React, {useContext} from "react";
import styles from "./modal.module.css"
import {ReactComponent as Close} from "./img/Close.svg";
import {ValueContext} from "../../ValueContext/ValueContext";

export const Modal = () => {

    const {activeModal, setActiveModal, childrenForm} = useContext(ValueContext)
    const handleKeyDown = (e) => {
        e.key === "Escape" && setActiveModal(false)
    }

    return <div tabIndex={1} onKeyDown={handleKeyDown}
                className={activeModal ? styles.active : styles.modal}>
        <div className={styles.content}>
            <span onClick={() => {
                setActiveModal(false)
            }} className={styles.close}><Close/></span>
            {childrenForm}
        </div>
    </div>
}