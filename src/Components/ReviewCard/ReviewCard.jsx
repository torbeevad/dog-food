import React, {memo, useContext, useEffect, useState} from "react";
import styles from "./review-card.module.css";
import {Rate} from "antd";
import {ReactComponent as Close} from "../Card/img/Trash.svg";
import {deleteReviewById} from "../../Utils/api";
import {ValueContext} from "../../ValueContext/ValueContext";

export const ReviewCard = memo(({reviewCard, setProdReview}) => {

    const {user} = useContext(ValueContext)

    const [testId, setTestId] = useState(Boolean)

    const deleteReview = async (prodId, revId) => {
        await deleteReviewById(prodId, revId).then(res => setProdReview(res.reviews)).catch(error => console.log(error))
    }

    useEffect(() => {
        const result = reviewCard.author._id === user?._id
        setTestId(result)
    }, [reviewCard, user._id])

    return (
        <div className={styles.review}>
            <span className={styles.line}></span>
            <div className={styles.headline}>
                <div className={styles.head}>
                    <span className={styles.name}>{reviewCard?.author.name}</span>
                    <span className={styles.date}>{new Date(reviewCard?.created_at).toLocaleString("ru-RU", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                    })}</span>
                    {testId &&
                        <span onClick={() => deleteReview(reviewCard.product, reviewCard._id)} className={styles.close}><Close/></span>}
                </div>
                <Rate value={reviewCard?.rating}/>
                <span className={styles.city}>из какого-то города</span>
            </div>
            <p className={styles.message}>{reviewCard?.text}</p>
        </div>
    )
})