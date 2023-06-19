import React, {memo} from "react";
import "./index.css";
import {Card} from "../Card/Card";

export const Catalog = memo(({items}) => {

    return <div className="wrapper">
        {items?.map(el => {
            return <Card key={el._id} product={el}/>
        })}
    </div>
})
