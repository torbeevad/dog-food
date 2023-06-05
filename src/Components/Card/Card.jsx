import React from "react";
import "./index.css"
import {NavLink} from "react-router-dom";
import {ReactComponent as Like} from "./img/ic-favorites-fill.svg";

export const Card = ({props, handleLike, user}) => {
    const isLiked = props.likes.some(e => e === user._id)

    const handleClick = () => {
        handleLike(props, isLiked)
    }

    return <div className="card">
        <div className="card__sticky">
            <div className="card__tags-wrapper">
                {!!props.discount && <div className="card__discount">-{props.discount}%</div>}
                {!!props.tags.includes("new") && <div className="card__new">New</div>}
                {!!props.tags.includes("sale") && <div className="card__sale">Sale</div>}
            </div>
            <Like onClick={handleClick} className={isLiked ? "card__like_liked" : "card__like"}/>
        </div>
        <NavLink className="card__nav-link" to={`/product/${props._id}`}>
            <img src={props.pictures} alt="food"
                 className="card__image"/>
            <div className="card__content">
                <span className={`${props.discount ? "card__old-price" : "card__price"}`}>{props.price} р</span>
                {!!props.discount &&
                    <span className="card__price-with-disc">{props.price - props.price / 100 * props.discount} р</span>}
                <span className="card__count">{props.wight}</span>
                <p className="card__description">{props.name}</p>
                <button className="card__button">В корзину</button>
            </div>
        </NavLink>

    </div>

}
