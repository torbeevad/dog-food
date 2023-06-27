import React from "react";
import {Catalog} from "../../Components/Catalog/Catalog";
import {Sort} from "../../Components/Sort/Sort";
import {QueryFind} from "../../Components/QueryFind/QueryFind";
import {useSelector} from "react-redux";
import {Loader} from "../../Components/Loader/Loader";

export const CatalogPage = () => {

    const {allProducts, loading} = useSelector(s => s.products)

    return (
        <>
            < QueryFind cards={allProducts}/>
            {allProducts?.length !== 0 && !loading ?
                <>
                    <Sort/>
                    <Catalog items={allProducts}/>
                </>
                :
                <Loader/>
            }
        </>
    )
}