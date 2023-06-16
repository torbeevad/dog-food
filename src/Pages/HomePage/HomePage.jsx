import React, {useContext} from "react";
import {Link} from "react-router-dom";
import {ValueContext} from "../../ValueContext/ValueContext";
import {QueryFind} from "../../Components/QueryFind/QueryFind";
import {Sort} from "../../Components/Sort/Sort";
import {Catalog} from "../../Components/Catalog/Catalog";
import styles from "./index.module.css"
import {useSelector} from "react-redux";

export const HomePage = () => {

    const {debounceValueInApp} = useContext(ValueContext)

    const {allProducts} = useSelector(state => state.products)

    return <main>
        {debounceValueInApp
            ? <>
                <QueryFind cards={allProducts}/>
                <Sort/>
                <Catalog cards={allProducts}/>
            </>  :
           <Link className={styles.link} to={"/catalog"}>
                <button className="home-page-button">Каталог&nbsp;></button>
            </Link>
        }
    </main>
}