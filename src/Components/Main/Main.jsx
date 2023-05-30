import React, {useEffect, useState} from "react";
import "./index.css";
import {Card} from "../Card/Card";
import {getProducts, searchProducts} from "../../Utils/api";

export const Main = ({search}) => {

    const [cards, setCards] = useState([])

    useEffect(() => {
        searchProducts(search).then(res => setCards(res))
    }, [search])


    useEffect(() => {
        getProducts().then(res => setCards(res))
    }, [])


    return <main>
        <div className="wrapper">
            {cards.map(el => {
                return <Card key={el._id} props={el}/>
            })}
        </div>
    </main>
}
