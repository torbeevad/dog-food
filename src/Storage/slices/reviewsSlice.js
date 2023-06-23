import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {isError, isLoading} from "../utils/utils.js";
import {deleteReviewById, getAllReviews, getReviewsById, setReviewById} from "../../Utils/api/apiReviews";
import {sortByDate} from "../utils/sort";

const initialState = {
    allReviews: [],
    reviewsById: [],
    review: {},
    loading: false,
}

export const fetchGetReviewsById = createAsyncThunk("reviews/fetchGetReviewsById", async function (productId, arg) {
    try {
        const state = arg.getState()
        const reviewsById = await getReviewsById(productId)
        return arg.fulfillWithValue({reviewsById, state})
    } catch (error) {
        return arg.rejectWithValue(error);
    }
})

export const fetchSetReviewsById = createAsyncThunk("reviews/fetchSetReviewsById", async function (data, arg) {
    try {
        const state = arg.getState()
        const updatedProduct = await setReviewById(data.id, data.data, data.rating)
        return arg.fulfillWithValue({updatedProduct, state})
    } catch (error) {
        return arg.rejectWithValue(error);
    }
})

export const fetchDeleteReviewsById = createAsyncThunk("reviews/fetchDeleteReviewsById", async function (data, arg) {
    try {
        const state = arg.getState()
        const updatedProduct = await deleteReviewById(data.prodId, data.reviewId)
        return arg.fulfillWithValue({updatedProduct, state})
    } catch (error) {
        return arg.rejectWithValue(error);
    }
})

export const fetchGetAllReviews = createAsyncThunk("reviews/fetchGetAllReviews", async function (data, arg) {
    try {
        const allReviews = await getAllReviews()
        return arg.fulfillWithValue(allReviews)
    } catch (error) {
        return arg.rejectWithValue(error)
    }
})

const reviewsSlice = createSlice({
    name: "reviews",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchGetAllReviews.fulfilled, (state, {payload}) => {
            state.allReviews = payload
            state.loading = false
        })
        builder.addCase(fetchGetReviewsById.fulfilled, (state, {payload}) => {
            state.reviewsById = sortByDate(payload.reviewsById);
            state.loading = false;
        })
        builder.addCase(fetchSetReviewsById.fulfilled, (state, {payload}) => {
            const productId = payload.updatedProduct;
            state.allReviews = payload.state.reviews.allReviews.map(e => e.product === productId ? payload.updatedProduct.reviews : e);
            state.loading = false;
        })
        builder.addCase(fetchDeleteReviewsById.fulfilled, (state, {payload}) => {
            const productId = payload.updatedProduct;
            state.allReviews = payload.state.reviews.allReviews.filter(e => e.product !== productId);
            state.loading = false;
        })
        builder.addMatcher(isLoading, (state) => {
            state.loading = true;
        })
        builder.addMatcher(isError, (state, {payload}) => {
            state.error = payload
            state.loading = false;
        })
    }
})


export default reviewsSlice.reducer;