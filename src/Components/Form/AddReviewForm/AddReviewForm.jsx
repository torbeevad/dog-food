import React, {useState} from "react";
import styles from "./add-review-form.module.css"
import {Rate} from "antd";
import {useForm} from "react-hook-form";
import {setReviewById} from "../../../Utils/api";

export const AddReviewForm = ({id, setProdReview, setAddReview}) => {

    const {register, handleSubmit, reset} = useForm()
    const [rating, setRating] = useState(0)

    const addReview = async (data) => {
        await setReviewById(id, data, rating).then(res => setProdReview(res.reviews)).catch(error => console.log(error));
        reset();
        setAddReview(state => !state);
    }

    return (
        <div>
            <form className={styles.form__review}>
                <Rate onChange={value => setRating(value)}/>
                <textarea className={styles.form__text} {...register("text")}/>
                <button onClick={handleSubmit(addReview)} type={"submit"}>Отправить</button>
            </form>
        </div>
    )
}