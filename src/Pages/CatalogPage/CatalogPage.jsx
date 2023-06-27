import React from "react";
import {Catalog} from "../../Components/Catalog/Catalog";
import {Sort} from "../../Components/Sort/Sort";
import {QueryFind} from "../../Components/QueryFind/QueryFind";
import {useSelector} from "react-redux";
import {Page404} from "../Page404/Page404";

export const CatalogPage = () => {

    const {allProducts} = useSelector(s => s.products)

    return (
        <>
            < QueryFind cards={allProducts}/>
            {allProducts?.length !== 0 ?
                <>
                    <Sort/>
                    <Catalog items={allProducts}/>
                </>
                :
                <Page404/>
            }
        </>
    )
}