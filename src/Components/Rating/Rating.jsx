import React from "react";
import {Rate} from 'antd';
import {averRating} from "../../Storage/utils/sort";
import {useSelector} from "react-redux";

const Rating = ({disabled}) => {

    const {product} = useSelector(state => state.products)


    return <Rate disabled={disabled} style={{fontSize: 14, color: "#FFAA0D"}} value={Math.round(averRating(product.reviews))} allowHalf={true}/>
};
export default Rating;