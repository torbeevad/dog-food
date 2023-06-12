import React, {useContext} from "react";
import {Link} from "react-router-dom";
import {ValueContext} from "../../ValueContext/ValueContext";
import {QueryFind} from "../../Components/QueryFind/QueryFind";
import {Sort} from "../../Components/Sort/Sort";
import {Catalog} from "../../Components/Catalog/Catalog";
import styles from "./index.module.css"

export const HomePage = () => {

    const {debounceValueInApp, products, setProducts} = useContext(ValueContext)


    return <main>
        {debounceValueInApp
            ? <>
                <QueryFind cards={products}/>
                <Sort cards={products} setFunc={setProducts}/>
                <Catalog cards={products}/>
            </>
            : <Link className={styles.link} to={"/catalog"}>
                <button className="home-page-button">Каталог&nbsp;></button>
            </Link>
        }
    </main>
}