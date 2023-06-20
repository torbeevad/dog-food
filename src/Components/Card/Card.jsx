import React from "react";
import "./index.css"
import {NavLink} from "react-router-dom";
import {ReactComponent as Like} from "./img/ic-favorites-fill.svg";
import {useDispatch, useSelector} from "react-redux";
import {fetchChangeProductLike} from "../../Storage/slices/productsSlice";
import {addUnit} from "../../Storage/slices/cartSlice";
import {useNavigate} from "react-router";
import cn from "classnames";

export const Card = ({product}) => {

    const navigate = useNavigate()

    const dispatch = useDispatch()
    const {user} = useSelector(state => state.user)
    const {cartList} = useSelector(state => state.cart)

    const isLiked = product.likes.includes(user._id)

    const available = cartList.some(e => e.product._id === product._id)

    const handleFetch = () => {
        dispatch(fetchChangeProductLike(product))
    }

    const handleAddToCart = (e) => {
        e.stopPropagation()
        e.preventDefault()
        if (product.stock > 0) {
            dispatch(addUnit({product, qty: 1}))
        }
    }

    const fu = () => {
        if (available) {
            return "Уже в корзине"
        } else if (product.stock === 0) {
            return "Нет в продаже"
        } else {
            return "В Корзину"
        }
    }

    const wayToCart = () => {
        navigate("/cart")
    }


    return <div className="card">
        <div className="card__sticky">
            <div className="card__tags-wrapper">
                {!!product.discount && <div className="card__discount">-{product.discount}%</div>}
                {!!product.tags?.includes("new") && <div className="card__new">New</div>}
                {!!product.tags?.includes("sale") && <div className="card__sale">Sale</div>}
            </div>
            <div className="card__favorite">
                <Like onClick={handleFetch} className={cn("card__like", {"liked" : isLiked})}/>
            </div>
        </div>
        <NavLink className="card__nav-link" to={`/product/${product._id}`}>

            <div className="card__image-wrapper">
                <img src={product.pictures} alt="food"
                     className="card__image"/>
            </div>
        </NavLink>
        <div className="card__content">
                <span
                    className={cn("card__price", {"old-price" : !!product.discount})}>{product.price}&nbsp;&#8381;</span>
            {!!product.discount &&
                <span
                    className="card__price-with-disc">{(product.price - product.price / 100 * product.discount).toFixed()}&nbsp;&#8381;</span>}
            <span className="card__count">{product.wight}</span>
            <p className="card__description">{product.name}</p>
            <button disabled={product.stock === 0} onClick={available ? wayToCart : handleAddToCart}
                    className={cn("card__button", {"disabled" : product.stock === 0})}>{fu()}</button>
        </div>
    </div>
}

