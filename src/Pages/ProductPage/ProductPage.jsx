import React, {useEffect} from "react";
import {Product} from "../../Components/Product/Product";
import {useParams} from "react-router";
import {useDispatch, useSelector} from "react-redux";
import {fetchGetProduct} from "../../Storage/slices/productsSlice";

export const ProductPage = () => {

    const dispatch = useDispatch()
    const params = useParams()

    const {product} = useSelector(state => state.products)

    useEffect(() => {
        if (product._id !== params.id) {
            dispatch(fetchGetProduct(params.id))
        }
    }, [dispatch, params.id, product])

    return (
        <>
            {!!Object.keys(product).length &&
                <Product/>
            }
        </>
    )
}