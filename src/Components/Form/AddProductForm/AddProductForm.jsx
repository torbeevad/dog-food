import React from "react";
import styles from "./index.module.css"
import {useForm} from "react-hook-form";
import {useDispatch} from "react-redux";
import {fetchAddProduct} from "../../../Storage/slices/productsSlice";
import {Input} from "../../Input/Input";

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
                <Input type="text" name="pictures" register={register} placeholder="url фото"
                       errors={errors.pictures}/>
            </div>
            <div className={styles.add__name}>
                <Input type="text" name="name" register={register} placeholder="название"
                       errors={errors.name}/>
            </div>
            <div className={styles.add__wight}>
                <Input type="text" name="wight" register={register} placeholder="ед.изм."
                       errors={errors.wight}/>
            </div>
            <div className={styles.add__price}>
                <Input type="number" name="price" register={register} placeholder="цена"
                       errors={errors.price}/>
            </div>
            <div className={styles.add__stock}>
                <Input type="number" name="stock" register={register} placeholder="кол-во"
                       errors={errors.stock}/>
            </div>
            <div className={styles.add__discount}>
                <Input type="number" name="discount" register={register} placeholder="скидка"
                       errors={errors.discount}/>
            </div>
            <div className={styles.about__wrap}>
                <textarea className={styles.about} placeholder="описание"
                          {...register("description")} />
            </div>
            <button className={styles.add__button} onClick={handleSubmit(sendMyProduct)}>Добавить</button>
        </>
    )
}