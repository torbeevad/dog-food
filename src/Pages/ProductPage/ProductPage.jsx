import React, {useEffect, useState} from "react";
import {Product} from "../../Components/Product/Product";
import {getProductById} from "../../Utils/api";
import {useParams} from "react-router";

export const ProductPage = () => {

    const [product, setProduct] = useState({})

    const params = useParams()

    useEffect(() => {
        getProductById(params.id).then(res => setProduct(res).catch(e=>console.log(e)), [params.id])
    }, [params.id])

    return <main>
        {!!Object.keys(product).length ?
            <Product product={product}/> :
            <div>Loading</div>
        }
    </main>
}