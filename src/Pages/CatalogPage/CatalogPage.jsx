import React, {useContext} from "react";
import {Catalog} from "../../Components/Catalog/Catalog";
import {Sort} from "../../Components/Sort/Sort";
import {QueryFind} from "../../Components/QueryFind/QueryFind";
import {Page404} from "../Page404/Page404";
import {ValueContext} from "../../ValueContext/ValueContext";

export const CatalogPage = () => {

    const {products, setProducts} = useContext(ValueContext)

    return <main>
        <QueryFind cards={products}/>
        {products.length !== 0 ?
            <>
                <Sort cards={products} setFunc={setProducts}/>
                <Catalog cards={products}/>
            </> :
            <Page404/>}
    </main>

}