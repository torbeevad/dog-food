import React, {useCallback} from "react";
import styles from "./index.module.css"
import cn from "classnames";
import {addUnit} from "../../Storage/slices/cartSlice";
import {useDispatch} from "react-redux";
import {useLocation, useNavigate} from "react-router";

export const Button = ({unit, type, available, color, children, onClick}) => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()

    const wayToCart = useCallback(() => {
        navigate("/cart")
    }, [navigate])

    const wayToHome = useCallback(() => {
        navigate("/")
    }, [navigate])

    const handleAddToCart = useCallback((e) => {
        e.stopPropagation()
        e.preventDefault()
        if (unit?.stock > 0) {
            dispatch(addUnit({product: unit, qty: 1}))
        }
    }, [dispatch, unit])

    const childrenChoose = useCallback(() => {
        if (!!children) {
            return children
        } else if (unit?.stock === 0 && location.pathname.includes("product")) {
            return "На главную"
        } else if (unit.stock === 0) {
            return "Нет в продаже"
        } else if (!available) {
            return "В корзину"
        } else if (available) {
            return "Уже в корзине"
        }
    }, [available, children, unit, location])

    const onClickChoose = useCallback(() => {
        if (!!onClick) {
            return onClick
        } else if (unit?.stock === 0 && location.pathname.includes("/product/")) {
            return wayToHome
        } else if (!available) {
            return handleAddToCart
        } else if (available) {
            return wayToCart
        }
    }, [available, handleAddToCart, location.pathname, onClick, unit?.stock, wayToCart, wayToHome])


    return (
        <>
            <button type={type} disabled={unit?.stock === 0 && !location.pathname.includes("/product/")}
                    onClick={onClickChoose()}
                    className={cn([styles.button], [styles.yellow], {
                        [styles.white]: color === "white",
                        [styles.disabled]: unit?.stock === 0 && !location.pathname.includes("/product/"),
                    })}>{childrenChoose()}</button>
        </>
    )
}
