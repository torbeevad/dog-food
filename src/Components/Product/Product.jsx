import React, {useEffect, useState} from "react";
import styles from "./product.module.css"
import truck from "./Truck.svg"
import union from "./Union.svg"
import {Counter} from "../Counter/Counter";
import {useNavigate, useParams} from "react-router";
import Rating from "../Rating/Rating";
import {getProductById} from "../../Utils/api";

export const Product = () => {

    const [product, setProduct] = useState({})

    const params = useParams()

    const navigate = useNavigate()
    const back = () => {
        navigate("/")
    }

    useEffect(() => {
        getProductById(params.id).then(res => setProduct(res))
    }, [params.id])


    return <div className={styles.wrapper}>
        <div className={styles.header}>
            <span className={styles.back} onClick={back}>Назад</span>
            <h3>{product.name}</h3>
            <div className={styles.info}>
                <span>Артикул</span>
                <Rating id={params.id}/>
                <span>Отзывы</span>
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
                                <span
                                    className={product.discount ? styles.oldprice : styles.hide}>{product.price} р.</span>
                            <span
                                className={product.discount ? styles.pricewithdisc : styles.price}>{(product.price - product.price / 100 * product.discount).toFixed()} р.</span>
                        </div>
                        <div className={styles.buttons}>
                            <Counter/>
                            <button>В корзину</button>
                        </div>
                        <span onClick={() => {
                        }} className={styles.favorite}>В избранное</span>
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
                                    <p>Если Вам не понравилось качество нашей продукции, мы вернем деньги, либо сделаем
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
                    <div className={styles.title}><span>Вес</span><span className={styles.dashed}></span></div>
                    <span>{product.wight}</span>
                    <div className={styles.title}><span>Цена</span><span className={styles.dashed}></span></div>
                    <span>{product.price - product.price / 100 * product.discount} р.</span>
                    <div className={styles.title}><span>Польза</span><span className={styles.dashed}></span></div>
                    <div>Большое содержание аминокислот и микроэлементов
                        оказывает
                        положительное воздействие на общий обмен веществ собаки. Способствуют укреплению десен и
                        жевательных мышц.
                        Развивают зубочелюстной аппарат, отвлекают собаку во время смены зубов.
                        Имеет цельную волокнистую структуру, при разжевывание получается эффект зубной щетки, лучше
                        всего очищает клыки собак.
                        Следует учесть высокую калорийность продукта.
                    </div>
                </div>
            </div>
        </div>
    </div>

}