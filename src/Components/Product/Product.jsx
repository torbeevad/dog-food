import React from "react";
import styles from "./product.module.css";
import truck from "../../assets/Truck.svg";
import union from "../../assets/Union.svg";
import {Counter} from "../Counter/Counter";
import Rating from "../Rating/Rating";
import {ReactComponent as Like} from "../../assets/ic-favorites-fill.svg";
import {ReactComponent as Trash} from "../../assets/Trash.svg";
import {useDispatch, useSelector} from "react-redux";
import {Reviews} from "../Reviews/Reviews";
import {fetchChangeProductLike} from "../../Storage/slices/productsSlice";
import {Button} from "../Button/Button";
import {Back} from "../Back/Back";

export const Product = () => {


    const dispatch = useDispatch()
    const {cartList} = useSelector(state => state.cart)
    const {user} = useSelector(state => state.user)
    const {product} = useSelector(state => state.products)


    const available = cartList.some(e => e.product._id === product._id)
    const {qty} = available && cartList.find(e => e.product._id === product._id)

    const isLiked = product.likes.includes(user._id)

    const handleChangeLike = () => {
        dispatch(fetchChangeProductLike(product))
    }

    let prodStr = "";
    let str = product.reviews.length.toString()


    if (str.match(/1$/g)) {
        prodStr = "отзыв";
    }

    if (str.match(/[2-4]$/g)) {
        prodStr = "отзыва";
    }

    if (str.match(/[0,5-9]$|1[0-9]$/g)) {
        prodStr = "отзывов";
    }

    if (str.match(/^0$/g)) {
        prodStr = "нет отзывов";
    }

    const handleClickScroll = () => {
        const element = document.querySelector("#reviews");
        if (element) {
            element.scrollIntoView({behavior: 'smooth'});
        }
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.header}>
                <Back/>
                <h3>{product.name}</h3>
                <div className={styles.info}>
                    <span>Артикул</span>
                    <Rating disabled={true} id={product}/>
                    <div className={styles.link} onClick={handleClickScroll}>
                        {product.reviews.length
                            ? <span>{product.reviews.length} {prodStr}</span>
                            : <span>{prodStr}</span>}
                    </div>
                </div>
            </div>
            <div className={styles.content}>
                <div className={styles.properties}>
                    <div className={styles.left}>
                        <span
                            className={product.discount ? styles.disc : styles.hide}>{product.discount ? `${product.discount}%` : ""}</span>
                        <img className={styles.image} src={product.pictures} alt=""/>
                    </div>
                    <div className={styles.right}>
                        <img className={styles.preimage} src={product.pictures} alt=""/>
                        <div className={styles.frame}>
                            <div className={styles.prices}>
                            <span className={product.discount ? styles.oldprice : styles.hide}>
                                    {product.price}&nbsp;&#8381;</span>
                                <span
                                    className={product.discount ? styles.pricewithdisc : styles.price}>
                                {(product.price - product.price / 100 * product.discount).toFixed()}&nbsp;&#8381;</span>
                            </div>
                            <div className={styles.buttons}>{product.stock
                                ? <Counter product={product} qty={qty}/>
                                : <b>Нет на складе!</b>}
                                <Button unit={product} available={available}/>
                            </div>
                            <div className={styles.favorite}>{!isLiked ?
                                <Like className={styles.favorite__pic}/> :
                                <Trash className={styles.favorite__pic}/>}<span
                                onClick={handleChangeLike}
                                className={styles.favorite__text}>{!isLiked ? 'В избранное' : "Убрать из избранного"}</span>
                            </div>
                            <div className={styles.placeholders}>
                                <div className={styles.delivery}>
                                    <img src={truck} alt="машина"/>
                                    <div>
                                        <b>Доставка по всему Миру!</b><br/>
                                        <span>Доставка курьером — от 399 ₽</span>,<br/>
                                        <span>Доставка в пункт выдачи — от 199 ₽</span>
                                    </div>
                                </div>
                                <div className={styles.warranty}>
                                    <img src={union} alt="штамп"/>
                                    <div>
                                        <b>Гарантия качества</b>,<br/>
                                        <p>Если Вам не понравилось качество нашей продукции, мы вернем деньги,
                                            либо
                                            сделаем
                                            все
                                            возможное, чтобы удовлетворить ваши нужды.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.description}>
                    <b>Описание</b>
                    <div dangerouslySetInnerHTML={{__html: product.description}}></div>
                </div>
                <div className={styles.characteristics}>
                    <b>Характеристики</b>
                    <div className={styles.details}>
                        <div className={styles.title}><span>Вес</span><span className={styles.dashed}></span>
                        </div>
                        <span>{product.wight}</span>
                        <div className={styles.title}><span>Цена</span><span className={styles.dashed}></span>
                        </div>
                        <span>{product.price - product.price / 100 * product.discount} р.</span>
                        <div className={styles.title}><span>Польза</span><span className={styles.dashed}></span>
                        </div>
                        <div>Большое содержание аминокислот и микроэлементов
                            оказывает
                            положительное воздействие на общий обмен веществ собаки. Способствуют укреплению
                            десен и
                            жевательных мышц.
                            Развивают зубочелюстной аппарат, отвлекают собаку во время смены зубов.
                            Имеет цельную волокнистую структуру, при разжевывание получается эффект зубной
                            щетки,
                            лучше
                            всего очищает клыки собак.
                            Следует учесть высокую калорийность продукта.
                        </div>
                    </div>
                </div>
            </div>
            <Reviews/>
        </div>
    )
}