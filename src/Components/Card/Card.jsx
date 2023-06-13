import React, {useContext} from "react";
import "./index.css"
import {NavLink} from "react-router-dom";
import {ReactComponent as Like} from "./img/ic-favorites-fill.svg";
import {ValueContext} from "../../ValueContext/ValueContext";

export const Card = ({card}) => {

    const {handleLike, user} = useContext(ValueContext)

    const isLiked = card.likes.some(e => e === user._id)

    const handleClick = () => {
        handleLike(card, isLiked)
    }

    return <div className="card">
        <div className="card__sticky">
            <div className="card__tags-wrapper">
                {!!card.discount && <div className="card__discount">-{card.discount}%</div>}
                {!!card.tags.includes("new") && <div className="card__new">New</div>}
                {!!card.tags.includes("sale") && <div className="card__sale">Sale</div>}
            </div>
            <div className="card__favorite">
                <Like onClick={handleClick} className={isLiked ? "card__like_liked" : "card__like"}/>
            </div>
        </div>
        <NavLink className="card__nav-link" to={`/product/${card._id}`}>

            <div className="card__image-wrapper">
                <img src={card.pictures} alt="food"
                     className="card__image"/>
            </div>

            <div className="card__content">
                <span
                    className={`${card.discount ? "card__old-price" : "card__price"}`}>{card.price}&nbsp;&#8381;</span>
                {!!card.discount &&
                    <span
                        className="card__price-with-disc">{(card.price - card.price / 100 * card.discount).toFixed()}&nbsp;&#8381;</span>}
                <span className="card__count">{card.wight}</span>
                <p className="card__description">{card.name}</p>
                <button className="card__button">В&nbsp;корзину</button>
            </div>
        </NavLink>
    </div>
}
