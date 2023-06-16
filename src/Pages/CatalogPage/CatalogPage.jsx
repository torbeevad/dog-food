import React from "react";
import {Catalog} from "../../Components/Catalog/Catalog";
import {Sort} from "../../Components/Sort/Sort";
import {QueryFind} from "../../Components/QueryFind/QueryFind";
import {Page404} from "../Page404/Page404";
import {useSelector} from "react-redux";

export const CatalogPage = () => {

    const {allProducts} = useSelector(s => s.products)

    return <main>
        <QueryFind cards={allProducts}/>
        {allProducts?.length !== 0 ?
            <>
                <Sort/>
                <Catalog items={allProducts}/>
            </> :
            <Page404/>}
    </main>

}