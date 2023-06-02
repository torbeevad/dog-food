import React, {useEffect, useState} from "react";
import {Catalog} from "../../Components/Catalog/Catalog";
import {Sort} from "../../Components/Sort/Sort";
import {QueryFind} from "../../Components/QueryFind/QueryFind";
import {getProducts, searchProducts} from "../../Utils/api";
import {Page404} from "../Page404/Page404";

export const CatalogPage = ({search}) => {

    const [products, setProducts] = useState([])

    const [sort, setSort] = useState(undefined)

    const [cards, setCards] = useState([])

    useEffect(() => {
        searchProducts(search).then(res => setCards(res))
    }, [search])

    useEffect(() => {
        setCards(sort)
    }, [sort])

    useEffect(() => {
        setCards(products)
    }, [products])

    useEffect(() => {
        getProducts().then(res => setProducts(res))
    }, [])

    return <main>
        <QueryFind search={search} cards={cards}/>
        {cards.length !== 0 ?
            <>
                <Sort products={products} setSort={setSort}/>
                <Catalog cards={cards}/>
            </> :
            <Page404/>}
    </main>

}