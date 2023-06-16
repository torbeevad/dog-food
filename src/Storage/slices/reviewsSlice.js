import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {isError, isLoading} from "../utils/utils.js";
import {deleteReviewById, getReviewsById, setReviewById} from "../../Utils/api";
import {sortByDate} from "../../Utils/sort";

const initialState = {
    reviews: [],
    review: {},
    loading: false,
}

export const fetchGetReviewsById = createAsyncThunk("reviews/fetchGetReviewsById", async function (productId, arg) {
    try {
        const state = arg.getState()
        const reviews = await getReviewsById(productId)
        return arg.fulfillWithValue({reviews, state})
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

const reviewsSlice = createSlice({
    name: "reviews",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchGetReviewsById.fulfilled, (state, action) => {
            state.reviews = sortByDate(action.payload.reviews);
            state.loading = false;
        })
        builder.addCase(fetchSetReviewsById.fulfilled, (state, action) => {
            state.product = action.payload.updatedProduct;
            state.allProducts = action.payload.state.products.allProducts.map(e => e._id === action.payload.updatedProduct._id ? action.payload.updatedProduct : e);
            state.loading = false;
        })
        builder.addCase(fetchDeleteReviewsById.fulfilled, (state, action) => {
            state.product = action.payload.updatedProduct;
            state.allProducts = action.payload.state.products.allProducts.map(e => e._id === action.payload.updatedProduct._id ? action.payload.updatedProduct : e);
            state.loading = false;
        })
        builder.addMatcher(isLoading, (state) => {
            state.loading = true;
        })
        builder.addMatcher(isError, (state, action) => {
            state.error = action.payload
            state.loading = false;
        })
    }
})


export default reviewsSlice.reducer;