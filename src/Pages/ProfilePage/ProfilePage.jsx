import React from "react";
import styles from "./profile.module.css"
import {AddProductForm} from "../../Components/Form/AddProductForm/AddProductForm";
import {ProfileDescription} from "../../Components/ProfileDescription/ProfileDescription";
import {MyProductList} from "../../Components/MyProductList/MyProductList";

export const ProfilePage = () => {

    return (
        <form className={styles.profile__wrapper}>
            <ProfileDescription/>
            <AddProductForm/>
            <MyProductList/>
        </form>

    )
}