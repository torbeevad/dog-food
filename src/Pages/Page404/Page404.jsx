import React from "react";
import styles from "./page404.module.css"
import {ReactComponent as NotFound} from "./ic-notfound.svg"
import {useNavigate} from "react-router";

export const Page404 = ({message}) => {

    const navigate = useNavigate()

    const home = () => {
        navigate("/")
    }

    return <main>
        <div className={styles.wrapper}>
            <NotFound className={styles.nfound}/>
            {message ? message : <b className={styles.title}>Простите, по вашему запросу <br/>
                товаров не найдено.
            </b>}
            <button onClick={home}>На главную</button>
        </div>

    </main>
}