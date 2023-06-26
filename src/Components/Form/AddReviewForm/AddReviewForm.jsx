import React, {useState} from "react";
import styles from "./index.module.css"
import {Rate} from "antd";
import {useForm} from "react-hook-form";
import {useDispatch} from "react-redux";
import {fetchSetReview} from "../../../Storage/slices/productsSlice";
import {Button} from "../../Button/Button";

export const AddReviewForm = ({id, setAddReview, setShowBtn}) => {

    const dispatch = useDispatch()

    const {register, handleSubmit, reset, formState: {errors}} = useForm()
    const [rating, setRating] = useState(0)

    const addReview = (data) => {
        dispatch(fetchSetReview({id, data, rating}));
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
                <Button unit={id} color={"white"} onClick={handleSubmit(addReview)} children={"Отправить"}/>
            </form>
        </div>
    )
}