import React, {useCallback, useContext, useEffect, useState} from "react";
import styles from "./reviews.module.css";
import {ReviewCard} from "../ReviewCard/ReviewCard";
import {getReviewsById} from "../../Utils/api";
import {AddReviewForm} from "../Form/AddReviewForm/AddReviewForm";
import {ValueContext} from "../../ValueContext/ValueContext";

export const Reviews = ({productId}) => {

    const {user} = useContext(ValueContext)

    const [prodReview, setProdReview] = useState([])
    const [addReview, setAddReview] = useState(false)
    const [testId, setTestId] = useState(Boolean)

    const sortByDate = useCallback((arr) => {
        return arr.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
    }, [])

    useEffect(() => {
        const result = prodReview.some(e => e.author._id === user._id)
        setTestId(result)
    }, [prodReview, user._id])

    useEffect(() => {
        getReviewsById(productId).then(res => setProdReview(res)).catch(e => console.log(e))
    }, [productId, setProdReview])

    return (
        <div className={styles.wrapper}>
            <h3 className={styles.title}>Отзывы</h3>
            {!testId && <button onClick={() => {
                setAddReview(true);
                setTestId(true)
            }} className={styles.button}>Написать отзыв
            </button>}
            {addReview &&
                <AddReviewForm setAddReview={setAddReview} prodReview={prodReview} setProdReview={setProdReview}
                               id={productId}/>}
            <h4>Фотографии наших покупателей</h4>
            <div className={styles.photos}>ТУТ БУДУТ ФОТО</div>
            {prodReview.length ? sortByDate(prodReview).map(el => <ReviewCard key={el.author._id}
                                                                              setProdReview={setProdReview}
                                                                              reviewCard={el}/>) :
                <span>Отзывов пока нет.</span>}
        </div>
    )
}
