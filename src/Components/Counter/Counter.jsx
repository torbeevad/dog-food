import React, {memo, useCallback} from "react";
import styles from "./counter.module.css";
import {ReactComponent as Minus} from "../../assets/Minus.svg";
import {ReactComponent as Plus} from "../../assets/Plus.svg";
import {useDispatch} from "react-redux";
import {addUnit, deleteUnit, reduceUnit} from "../../Storage/slices/cartSlice";
import {useNavigate} from "react-router";

export const Counter = memo(({product, qty}) => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const increase = useCallback((e) => {
        e.stopPropagation()
        e.preventDefault()
        if (qty < product?.stock) {
            dispatch(addUnit({product, qty: 1}))
        }
    }, [product, dispatch, qty])

    const decrease = useCallback((e) => {
        e.stopPropagation()
        e.preventDefault()
        if (qty > 1) {
            dispatch(reduceUnit({product, qty: 1}))
        } else if (qty === 1) {
            dispatch(deleteUnit(product))
        }
    }, [dispatch, product, qty])

    return <div className={styles.wrapper}>
        <div onClick={decrease} className={styles.operator}><Minus
            className={qty > 0 ? styles.active : styles.disable}/></div>
        <div onClick={() => navigate("/cart")} className={styles.count}>{!!qty ? qty : qty = 0}</div>
        <div onClick={increase} className={styles.operator}><Plus
            className={qty === product?.stock ? styles.disable : styles.active}/></div>
    </div>
})