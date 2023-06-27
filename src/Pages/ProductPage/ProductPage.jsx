import React, {useEffect} from "react";
import {Product} from "../../Components/Product/Product";
import {useParams} from "react-router";
import {useDispatch, useSelector} from "react-redux";
import {fetchGetProduct} from "../../Storage/slices/productsSlice";
import {Loader} from "../../Components/Loader/Loader";

export const ProductPage = () => {

    const dispatch = useDispatch()

    const params = useParams()

    const {product, loading} = useSelector(state => state.products)

    useEffect(() => {
        dispatch(fetchGetProduct(params.id))
    }, [dispatch, params.id])

    return (
        <>
            {!!Object.keys(product).length && !loading ?
                <Product product={product}/> :
                <Loader/>
            }
        </>
    )
}