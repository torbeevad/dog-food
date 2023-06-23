import React from "react";
import styles from "./index.module.css"
import {useForm} from "react-hook-form";
import {useDispatch} from "react-redux";
import {fetchAddProduct} from "../../../Storage/slices/productsSlice";

export const AddProductForm = () => {

    const dispatch = useDispatch()
    const {register, handleSubmit, formState: {errors}, reset} = useForm()


    const sendMyProduct = (data) => {
        dispatch(fetchAddProduct(data))
        reset()
    }

    return (
        <>
            <h3 className={styles.add__title}>Добавить продукт</h3>
            <div className={styles.add__pictures}>
                <input className={styles.input} placeholder="url фото"
                       type="text" {...register("pictures")} />
                <span>{errors?.pictures && errors?.pictures.message}</span>
            </div>
            <div className={styles.add__name}>
                <input className={styles.input} placeholder="название"
                       type="text" {...register("name")} />
                <span>{errors?.name && errors?.name.message}</span>
            </div>
            <div className={styles.add__available}>
                <input className={styles.input} placeholder="наличие"
                       type="checkbox" {...register("available")} />
                <span>{errors?.available && errors?.available.message}</span>
            </div>
            <div className={styles.add__wight}>
                <input className={styles.input} placeholder="ед.изм."
                       type="number" {...register("wight")} />
                <span>{errors?.wight && errors?.wight.message}</span>
            </div>
            <div className={styles.add__price}>
                <input className={styles.input} placeholder="цена"
                       type="number" {...register("price")} />
                <span>{errors?.price && errors?.price.message}</span>
            </div>
            <div className={styles.add__stock}>
                <input className={styles.input} placeholder="кол-во"
                       type="number" {...register("stock")} />
                <span>{errors?.stock && errors?.stock.message}</span>
            </div>
            <div className={styles.add__discount}>
                <input className={styles.input} placeholder="скидка"
                       type="number" {...register("discount")} />
                <span>{errors?.discount && errors?.discount.message}</span>
            </div>
            <div className={styles.about__wrap}>
                <textarea className={styles.about} placeholder="описание"
                          {...register("description")} />
            </div>
            <button className={styles.add__button} onClick={handleSubmit(sendMyProduct)}>Добавить</button>
        </>
    )
}