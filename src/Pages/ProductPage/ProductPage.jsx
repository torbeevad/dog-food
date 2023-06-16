import React, {useEffect} from "react";
import {Product} from "../../Components/Product/Product";
import {useParams} from "react-router";
import {useDispatch, useSelector} from "react-redux";
import {fetchProduct} from "../../Storage/slices/productsSlice";

export const ProductPage = () => {

    const dispatch = useDispatch()

    const params = useParams()

    const {product} = useSelector(state => state.products)
    const {reviews} = useSelector(state => state.reviews)

    useEffect(() => {
        dispatch(fetchProduct(params.id))
    }, [dispatch, params.id, reviews])

    return (
        <>
            {!!Object.keys(product).length ?
                <Product product={product}/> :
                <div>Loading</div>
            }
        </>
    )
}