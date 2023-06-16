import React, {useEffect, useState} from "react";
import {Product} from "../../Components/Product/Product";
import {getProductById} from "../../Utils/api";
import {useParams} from "react-router";
import {fetchProduct} from "../../Storage/slices/productsSlice";
import {useDispatch, useSelector} from "react-redux";

export const ProductPage = () => {

    // const [product, setProduct] = useState({})

    const dispatch = useDispatch()

    const params = useParams()

    const {product} = useSelector(state => state.products)
    const {isLiked} = useSelector(state => state.products)

    // useEffect(() => {
    //     getProductById(params.id).then(res => setProduct(res), [params.id])
    // }, [params.id])

    useEffect(() => {
        dispatch(fetchProduct(params.id))
    }, [dispatch, params.id, isLiked])

    return <main>
        {!!Object.keys(product).length ?
            <Product product={product} isLiked={isLiked}/> :
            <div>Loading</div>
        }
    </main>
}