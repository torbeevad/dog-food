import React from "react";
import {MyCard} from "../MyCard/MyCard";
import styles from "./index.module.css"
import {useSelector} from "react-redux";


export const MyProductList = () => {

    const {myProducts} = useSelector(state => state.products)

    return (
        <div className={styles.list}>
            <h3>Ваши продукты</h3>
            {myProducts?.map(e => <MyCard key={e._id} product={e}/>)}
        </div>
    )
}