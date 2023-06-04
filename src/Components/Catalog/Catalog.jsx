import React from "react";
import "./index.css";
import {Card} from "../Card/Card";

export const Catalog = ({products}) => {

    return <div className="wrapper">
        {products.map(el => {
            return <Card key={el._id} props={el}/>
        })}
    </div>
}
