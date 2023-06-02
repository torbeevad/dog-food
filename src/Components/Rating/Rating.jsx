import React from "react";
import {Rate} from 'antd';
import {getReviewsById} from "../../Utils/api";
import {useEffect, useState} from "react";

const Rating = ({id}) => {

    const [rating, setRating] = useState(0)

    useEffect(() => {
        getReviewsById(id).then(res => (setRating((res.reduce((prev, curr) => prev + curr.rating, 0) / res.length).toFixed(1))))
    },[id])

    return <Rate style={{fontSize: 14, color: "#FFAA0D"}} value={rating} allowHalf={true}/>
};
export default Rating;