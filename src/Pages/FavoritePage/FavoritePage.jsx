import React from "react";
import {QueryFind} from "../../Components/QueryFind/QueryFind";
import {Catalog} from "../../Components/Catalog/Catalog";
import {Page404} from "../Page404/Page404";
import {Sort} from "../../Components/Sort/Sort";
import styles from "../Page404/page404.module.css";
import {useSelector} from "react-redux";

export const FavoritePage = () => {

    const {favorites} = useSelector(state => state.products)

    const message =  <b className={styles.title}>В Избранном пока ничего нет <br/>
        Добавляйте товары в Избранное с помощью ❤️️
    </b>

    return <main>
        <QueryFind cards={favorites}/>
        {favorites.length !== 0 ?
            <>
                <Sort />
                <Catalog items={favorites}/>
            </> :
            <Page404 message={message}/>}
    </main>

}