import React from "react";
import {Catalog} from "../../Components/Catalog/Catalog";
import {Sort} from "../../Components/Sort/Sort";
import {QueryFind} from "../../Components/QueryFind/QueryFind";
import {Page404} from "../Page404/Page404";

export const CatalogPage = ({search, products, setProducts}) => {

    return <main>
        <QueryFind search={search} products={products}/>
        {products.length !== 0 ?
            <>
                <Sort products={products} setProducts={setProducts}/>
                <Catalog products={products}/>
            </> :
            <Page404/>}
    </main>

}