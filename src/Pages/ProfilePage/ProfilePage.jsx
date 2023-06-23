import React from "react";
import styles from "./profile.module.css"
import {AddProductForm} from "../../Components/Form/AddProductForm/AddProductForm";
import {ProfileDescription} from "../../Components/ProfileDescription/ProfileDescription";
import {MyProductList} from "../../Components/MyProductList/MyProductList";
import {useSelector} from "react-redux";

export const ProfilePage = () => {

    const {myProducts} = useSelector(state => state.products)

    return (
        <form className={styles.profile__wrapper}>
            <ProfileDescription/>
            <AddProductForm/>
            <MyProductList myProducts={myProducts}/>
        </form>

    )
}