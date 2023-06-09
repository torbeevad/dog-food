import React, {useState} from "react";
import styles from "./counter.module.css";
import {ReactComponent as Minus} from "./Minus.svg";
import {ReactComponent as Plus} from "./Plus.svg";

export const Counter = () => {

    const [counter, setCounter] = useState(0)
    const increase = () => {
        setCounter(counter + 1)
    };

    const decrease = () => {
        if (counter > 0) {
            setCounter(counter - 1)
        }

    };

    return <div className={styles.wrapper}>
        <div onClick={decrease}><Minus className={counter > 0 ? styles.active : styles.minus}/></div>
        <div className={styles.count}>{counter}</div>
        {/*<input className={styles.count} value={counter}/>*/}
        <div onClick={increase}><Plus className={styles.plus}/></div>
    </div>
}