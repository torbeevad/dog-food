import React from "react";
import styles from "./page404.module.css"
import {ReactComponent as NotFound} from "./ic-notfound.svg"
import {useNavigate} from "react-router";

export const Page404 = () => {

    const navigate = useNavigate()

    const home = () => {
        navigate("/")
    }

    return <main>
        <div className={styles.wrapper}>
            <NotFound className={styles.notFound}/>
            <b>Простите, по вашему запросу <br/>
                товаров не найдено.
            </b>
            <button onClick={home}>На главную</button>
        </div>

    </main>
}