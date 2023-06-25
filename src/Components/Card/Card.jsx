import React from "react";
import "./index.css"
import {NavLink} from "react-router-dom";
import {ReactComponent as Like} from "../../assets/ic-favorites-fill.svg";
import {useDispatch, useSelector} from "react-redux";
import {fetchChangeProductLike} from "../../Storage/slices/productsSlice";
import cn from "classnames";
import {Counter} from "../Counter/Counter";
import {Button} from "../Button/Button";

export const Card = ({product}) => {

    const dispatch = useDispatch()
    const {user} = useSelector(state => state.user)
    const {cartList} = useSelector(state => state.cart)

    const isLiked = product.likes.includes(user._id)
    const available = cartList.some(e => e.product._id === product._id)
    const {qty} = available && cartList.find(e => e.product._id === product._id)

    const handleFetchLike = () => {
        dispatch(fetchChangeProductLike(product))
    }

    return <div className="card">
        <div className="card__sticky">
            <div className="card__tags-wrapper">
                {!!product.discount && <div className="card__discount">-{product.discount}%</div>}
                {!!product.tags?.includes("new") && <div className="card__new">New</div>}
                {!!product.tags?.includes("sale") && <div className="card__sale">Sale</div>}
            </div>
            <div className="card__favorite">
                <Like onClick={handleFetchLike} className={cn("card__like", {"liked": isLiked})}/>
            </div>
        </div>
        <NavLink className="card__nav-link" to={`/product/${product._id}`}>
            <div className="card__image-wrapper">
                <img src={product.pictures} alt="food" className="card__image"/>
            </div>
        </NavLink>
        <div className="card__content">
            <div className="card__prices">
                <span
                    className={cn("card__price", {"old-price": !!product.discount})}>{product.price}&nbsp;&#8381;</span>
                {!!product.discount && <span
                    className="card__price-with-disc">{(product.price - product.price / 100 * product.discount).toFixed()}&nbsp;&#8381;</span>}
            </div>
            <span className="card__count">{product.wight}</span>
            <p className="card__description">{product.name}</p>
            {available ? <Counter product={product} qty={qty}/> :
                <Button color={"yellow"} unit={product} available={available}/>
            }
        </div>
    </div>
}

