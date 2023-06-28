import React, {memo, useEffect, useState} from "react";
import styles from "./reviews.module.css";
import {ReviewCard} from "../ReviewCard/ReviewCard";
import {AddReviewForm} from "../Form/AddReviewForm/AddReviewForm";
import {useSelector} from "react-redux";
import {Button} from "../Button/Button";
import {sortByDate} from "../../Storage/utils/sort";


export const Reviews = memo(() => {

    const [addReview, setAddReview] = useState(false)
    const [showBtn, setShowBtn] = useState(Boolean)

    const {user} = useSelector(state => state.user)
    const {product} = useSelector(state => state.products)

    useEffect(() => {
        const result = product.reviews.some(e => e.author._id === user._id)
        setShowBtn(result)
    }, [product.reviews, user._id])

    return (
        <div id="reviews" className={styles.reviews__wrapper}>
            <h3 className={styles.title}>Отзывы</h3>
            {!showBtn && <Button color={"white"} children={"Оставить отзыв"} unit={product._id} onClick={() => {
                setAddReview(true);
                setShowBtn(state => !state)
            }} className={styles.button}/>}
            {addReview &&
                <AddReviewForm setShowBtn={setShowBtn} setAddReview={setAddReview} id={product._id}/>}
            <h4>Фотографии наших покупателей</h4>
            <div className={styles.photos}>ТУТ БУДУТ ФОТО</div>
            {product.reviews?.length ? sortByDate(product.reviews).map(el => <ReviewCard key={el.created_at}
                                                                                         reviewCard={el}/>) :
                <span>Отзывов пока нет.</span>}
        </div>
    )
})
