import React, {useState} from "react";
import styles from "./add-review-form.module.css"
import {Rate} from "antd";
import {useForm} from "react-hook-form";
import {useDispatch} from "react-redux";
import {fetchSetReviewsById} from "../../../Storage/slices/reviewsSlice";

export const AddReviewForm = ({id, setAddReview, setShowBtn}) => {

    const dispatch = useDispatch()

    const {register, handleSubmit, reset, formState: {errors}} = useForm()
    const [rating, setRating] = useState(0)

    const addReview = (data) => {
        dispatch(fetchSetReviewsById({id, data, rating}));
        reset();
        setAddReview(state => !state);
        setShowBtn(true)
    }

    return (
        <div>
            <form className={styles.form__review}>
                <Rate onChange={value => setRating(value)}/>
                <textarea className={styles.form__text} {...register("text", {required: "Напишите отзыв"})}/>
                {errors?.text && <span className={styles.error}>{errors?.text.message}</span>}
                <button onClick={handleSubmit(addReview)} type={"submit"}>Отправить</button>
            </form>
        </div>
    )
}