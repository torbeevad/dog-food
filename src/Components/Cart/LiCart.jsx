import React from "react";
import styles from "./cart.module.css"
import {Counter} from "../Counter/Counter";
import {ReactComponent as Trash} from "../../assets/Trash.svg";
import {useDispatch} from "react-redux";
import {deleteUnit} from "../../Storage/slices/cartSlice";
import {NavLink} from "react-router-dom";
import cn from "classnames";

export const LiCart = ({card, qty}) => {

    const dispatch = useDispatch()
    const handleDelete = () => {
        dispatch(deleteUnit(card))
    }

    return (
        <>
            <div className={styles.cart__unit}>
                <NavLink className="cart__nav-link" to={`/product/${card._id}`}>
                    <div className={styles.unit__left}>
                        <img className={styles.unit__img} src={card.pictures} alt="товар"/>
                        <div className={styles.unit__desc}>
                            <h3 className={styles.unit__name}>{card.name}</h3>
                            <span className={styles.unit__cnt}>{card.wight}</span>
                        </div>
                    </div>
                </NavLink>
                <div className={styles.unit__right}>
                    <Counter className={styles.unit__counter} product={card} qty={qty}/>
                    <div className={styles.unit__prices}>
                        {!!card.discount &&
                            <span className={styles.unit__price__old}>{card.price * qty}&nbsp;&#8381;</span>}
                        <b className={cn(styles.unit__price, {[styles.with_disc]: !!card.discount})}>{(card.price - card.price / 100 * card.discount).toFixed() * qty}&nbsp;&#8381;</b>
                    </div>
                    <button onClick={handleDelete} className={styles.unit__button}><Trash/></button>
                </div>
            </div>
            <span className={styles.line}></span>
        </>
    )
}