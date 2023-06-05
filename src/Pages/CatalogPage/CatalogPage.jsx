import React from "react";
import {Catalog} from "../../Components/Catalog/Catalog";
import {Sort} from "../../Components/Sort/Sort";
import {QueryFind} from "../../Components/QueryFind/QueryFind";
import {Page404} from "../Page404/Page404";

export const CatalogPage = ({search, products, setProducts, handleLike, user}) => {

    return <main>
        <QueryFind search={search} products={products}/>
        {products.length !== 0 ?
            <>
                <Sort products={products} setProducts={setProducts}/>
                <Catalog handleLike={handleLike} products={products} user={user}/>
            </> :
            <Page404/>}
    </main>

}