import React from "react";
import styles from "./index.module.css"
import {ReactComponent as Like} from "../../assets/ic-favorites-fill.svg";
import {ReactComponent as Trash} from "../../assets/Trash.svg";
import {useDispatch} from "react-redux";
import {fetchDeleteProduct} from "../../Storage/slices/productsSlice";
import {NavLink} from "react-router-dom";
import cn from "classnames";


export const MyCard = ({product}) => {

    const dispatch = useDispatch()

    const deleteProd = () => {
        dispatch(fetchDeleteProduct(product._id))
    }

    return (
        <div className={styles.my__card__wrap}>
            <NavLink className={styles.my__card__image__wrap} to={`/product/${product._id}`}>
                <img className={styles.my__card__image} src={product.pictures} alt="продукт"/>
            </NavLink>
            <div className={styles.my__card__pict__wrap}>
                <Like className={cn(styles.my__card__like, {[styles.liked]: !!product.likes.length})}/>
                {!!product.likes.length && <span className={styles.my__card__like}>{product.likes.length}</span>}
                <Trash onClick={deleteProd} className={styles.my__card__trash}/>
            </div>
        </div>
    )
}