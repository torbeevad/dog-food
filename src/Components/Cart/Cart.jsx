import React from "react";
import styles from "./cart.module.css"
import {LiCart} from "./LiCart";
import {useSelector} from "react-redux";
import {QueryFind} from "../QueryFind/QueryFind";
import {Link} from "react-router-dom";

export const Cart = () => {


    const {cartList} = useSelector(state => state.cart)

    const overAllPrice = cartList.reduce((acc, curr) => acc + curr.product.price * curr.qty, 0).toFixed()
    const overAllPriceWithDisc = cartList.reduce((acc, curr) => (acc + curr.product.price / 100 * curr.product.discount * curr.qty), 0).toFixed()
    const overAllDisc = overAllPrice - overAllPriceWithDisc



    return (
        <div className={styles.cart__wrapper}>
            <QueryFind cards={cartList}/>
            <div className={styles.cart__content}>
                <div className={styles.cart__list}>
                    {!cartList.length
                        ? <div className={styles.list__empty}><h3>Ваша корзина пуста</h3>
                            <Link className={styles.list__link} to={"/"}> За попукпами </Link>
                        </div>
                        : cartList.map(el => {
                            return <LiCart key={el.product._id} card={el.product} qty={el.qty}/>
                        })}
                </div>
                <div className={styles.cart__overall}>
                    <h3 className={styles.overall__title}>Ваша корзина</h3>
                    <div className={styles.overall__desc}>
                        <div className={styles.overall__top}>
                            <div>
                                <span className={styles.overall__price}>Товары ({cartList.length})</span><span
                                className={styles.overall__price}>{overAllPrice} ₽</span>
                            </div>
                            <div>
                                <span className={styles.overall__price}>Скидка</span><span
                                className={styles.overall__disc}>{overAllPriceWithDisc} ₽</span>
                            </div>
                        </div>
                    </div>
                    <span className={styles.line}></span>
                    <div className={styles.overall__bot}>
                        <div className={styles.overall__cost}>
                            <b>Общая стоимость</b><span>{overAllDisc} ₽</span>
                        </div>
                    </div>
                    <button>Оформить заказ</button>
                </div>
            </div>
        </div>
    )
}