import React from "react";
import {Rate} from 'antd';
import {useEffect} from "react";
import {averRating} from "../../Storage/utils/sort";
import {useDispatch, useSelector} from "react-redux";
import {fetchGetReviewsById} from "../../Storage/slices/reviewsSlice";

const Rating = ({id}) => {

    const dispatch = useDispatch()

    const {reviewsById} = useSelector(state => state.reviews)

    useEffect(() => {
        dispatch(fetchGetReviewsById(id))
    }, [dispatch, id])

    return <Rate style={{fontSize: 14, color: "#FFAA0D"}} value={Math.round(averRating(reviewsById))} allowHalf={true}/>
};
export default Rating;