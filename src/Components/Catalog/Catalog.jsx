import React from "react";
import "./index.css";
import {Card} from "../Card/Card";

export const Catalog = ({items}) => {

    return <div className="wrapper">
        {items?.map(el => {
            return <Card key={el._id} card={el}/>
        })}
    </div>
}
