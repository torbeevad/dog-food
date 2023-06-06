import React from "react";
import "./index.css";
import {Card} from "../Card/Card";

export const Catalog = ({cards}) => {

    return <div className="wrapper">
        {cards.map(el => {
            return <Card key={el._id} card={el}/>
        })}
    </div>
}
