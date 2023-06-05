import React from "react";
import "./index.css";
import {Card} from "../Card/Card";

export const Catalog = ({handleLike, products, user}) => {

    return <div className="wrapper">
        {products.map(el => {
            return <Card key={el._id} handleLike={handleLike} props={el} user={user}/>
        })}
    </div>
}
