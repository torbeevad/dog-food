import React from "react";
import "./index.css"
import {NavLink} from "react-router-dom";

export const Card = ({props}) => {

    return <NavLink to={`/product/${props._id}`} className="card">
        <div className="card__sticky">
            <div className="card__discount">{props.discount ? `${props.discount}%` : ""}</div>
            <div className="card__like">{`${Boolean(props.likes)}`}</div>
        </div>
        <img  src={props.pictures} alt="food"
             className="card__image"/>
        <div className="card__content">
            <span className={`${props.discount ? "card__price" : "hide"}`}>{props.price}р</span>
            <span className="card__price-with-disc">{props.price - props.price / 100 * props.discount}р</span>
            <span className="card__count">{props.wight}</span>
            <p className="card__description">{props.name}</p>
            <button className="card__button">В корзину</button>
        </div>

    </NavLink>;
}
