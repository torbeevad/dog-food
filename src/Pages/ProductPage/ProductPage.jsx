import React, {useEffect} from "react";
import {Product} from "../../Components/Product/Product";
import {useParams} from "react-router";
import {useDispatch, useSelector} from "react-redux";
import {fetchGetProduct} from "../../Storage/slices/productsSlice";
import {Page404} from "../Page404/Page404";

export const ProductPage = () => {

    const dispatch = useDispatch()

    const params = useParams()

    const {product} = useSelector(state => state.products)

    useEffect(() => {
        dispatch(fetchGetProduct(params.id))
    }, [dispatch, params.id])

    return (
        <>
            {!!Object.keys(product).length ?
                <Product product={product}/> :
                <Page404/>
            }
        </>
    )
}