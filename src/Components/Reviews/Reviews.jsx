import React, {memo, useEffect, useState} from "react";
import styles from "./reviews.module.css";
import {ReviewCard} from "../ReviewCard/ReviewCard";
import {AddReviewForm} from "../Form/AddReviewForm/AddReviewForm";
import {useDispatch, useSelector} from "react-redux";
import {fetchGetReviewsById} from "../../Storage/slices/reviewsSlice";

export const Reviews = memo(({productId}) => {

    const dispatch = useDispatch()

    const [addReview, setAddReview] = useState(false)
    const [showBtn, setShowBtn] = useState(Boolean)


    const {user} = useSelector(state => state.user)
    const {allReviews} = useSelector(state => state.reviews)
    const {reviewsById} = useSelector(state => state.reviews)

    useEffect(() => {
        dispatch(fetchGetReviewsById(productId))
    }, [dispatch, productId, allReviews])

    useEffect(() => {
        const result = reviewsById.some(e => e.author._id === user._id)
        setShowBtn(result)
    }, [reviewsById, user._id])

    return (
        <div id="reviews" className={styles.reviews__wrapper}>
            <h3 className={styles.title}>Отзывы</h3>
            {!showBtn && <button onClick={() => {
                setAddReview(true);
                setShowBtn(state => !state)
            }} className={styles.button}>Написать отзыв
            </button>}
            {addReview &&
                <AddReviewForm setShowBtn={setShowBtn} setAddReview={setAddReview} id={productId}/>}
            <h4>Фотографии наших покупателей</h4>
            <div className={styles.photos}>ТУТ БУДУТ ФОТО</div>
            {reviewsById?.length ? reviewsById.map(el => <ReviewCard key={el.author._id} reviewCard={el}/>) :
                <span>Отзывов пока нет.</span>}
        </div>
    )
})
