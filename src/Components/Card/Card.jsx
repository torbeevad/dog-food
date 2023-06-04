import React from "react";
import "./index.css"
import {NavLink} from "react-router-dom";
import {ReactComponent as Like} from "../Header/img/Favorites.svg";

export const Card = ({props}) => {

    return <NavLink to={`/product/${props._id}`} className="card">
        <div className="card__sticky">
            <div className="card__tags-wrapper">
                {!!props.discount && <div className="card__discount">{props.discount}%</div>}
                {!!props.tags[1] && <div className="card__new">New</div>}
                {!!props.tags[2] && <div className="card__sale">Sale</div>}
            </div>
            <Like className="card__like"/>
        </div>

        <img src={props.pictures} alt="food"
             className="card__image"/>
        <div className="card__content">
            <span className={`${props.discount ? "card__old-price" : "card__price"}`}>{props.price}р</span>
            {!!props.discount && <span className="card__price-with-disc">{props.price - props.price / 100 * props.discount}р</span>}
            <span className="card__count">{props.wight}</span>
            <p className="card__description">{props.name}</p>
            <button className="card__button">В корзину</button>
        </div>

    </NavLink>;
}
