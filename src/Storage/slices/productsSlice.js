import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {getProductById, getProducts, searchProducts} from "../../Utils/api";
import {isError, isLoading} from "../utils/utils";
import {changeProductLike} from "../../Utils/utils";
import {popular, newest, lowPrice, highPrice, rate, discount} from "../../Utils/sort";


const initialState = {
    loading: false,
    allProducts: [],
    product: {},
    favorites: [],
    length: 0,
}

export const fetchGetAllProducts = createAsyncThunk("products/fetchGetAllProducts", async function (data, arg) {
    try {
        const state = arg.getState()
        const data = await getProducts();
        return arg.fulfillWithValue(data, state);
    } catch (error) {
        return arg.rejectWithValue(error);
    }
})

export const fetchProduct = createAsyncThunk("products/fetchProduct", async function (data, arg) {
    try {
        const state = arg.getState()
        const product = await getProductById(data);
        return arg.fulfillWithValue({product, state});
    } catch (error) {
        return arg.rejectWithValue(error);
    }
})

export const fetchChangeProductLike = createAsyncThunk("products/fetchChangeProductLike", async function (data, arg) {
    try {
        const state = arg.getState();
        const isLiked = data.likes.includes(state.user.user._id)
        const updatedCard = await changeProductLike(data._id, isLiked);
        return arg.fulfillWithValue({state, data, updatedCard});
    } catch (error) {
        return arg.rejectWithValue(error);
    }
})
export const fetchSearchProduct = createAsyncThunk("products/fetchSearchProduct", async function (data, arg) {
    try {
        const state = arg.getState();
        const result = await searchProducts(data)
        return arg.fulfillWithValue({state, result});
    } catch (error) {
        return arg.rejectWithValue(error);
    }
})


const productsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        sortProducts: (state, action) => {
            switch (action.payload) {
                case ("popular"):
                    state.allProducts = popular(state.allProducts);
                    state.favorites = popular(state.favorites)
                    break;
                case ("newest"):
                    state.allProducts = newest(state.allProducts);
                    state.favorites = newest(state.favorites);
                    break;
                case ("lowPrice"):
                    state.allProducts = lowPrice(state.allProducts);
                    state.favorites = lowPrice(state.favorites);
                    break;
                case ("highPrice"):
                    state.allProducts = highPrice(state.allProducts);
                    state.favorites = highPrice(state.favorites);
                    break;
                case ("rate"):
                    state.allProducts = rate(state.allProducts);
                    state.favorites = rate(state.favorites);
                    break;
                case ("discount"):
                    state.allProducts = discount(state.allProducts);
                    state.favorites = discount(state.favorites);
                    break;
                default:
                    break;
            }
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchGetAllProducts.fulfilled, (state, action) => {
            state.allProducts = action.payload;
            state.favorites = action.payload.filter(e => e.likes.includes(action.meta.user.user._id));
            state.length = action.payload.length;
            state.loading = false;
        })
        builder.addCase(fetchChangeProductLike.fulfilled, (state, action) => {
            state.product = action.payload.updatedCard
            const updatedList = action.payload.state.products.allProducts.map(e => e._id === action.payload.updatedCard._id ? action.payload.updatedCard : e)
            state.allProducts = updatedList
            state.favorites = updatedList.filter(e => e.likes.includes(action.payload.state.user.user._id))
            // state.isLiked = action.payload.data.likes.includes(action.payload.state.user.user._id)
            state.loading = false;
        })
        builder.addCase(fetchProduct.fulfilled, (state, action) => {
            state.product = action.payload.product;
            state.loading = false;
        })
        builder.addCase(fetchSearchProduct.fulfilled, (state, action) => {
            state.allProducts = action.payload.result
            state.favorites = action.payload.result.filter(e => e.likes.includes(action.payload.state.user.user._id))
            state.loading = false;
        })
        builder.addMatcher(isError, (state, action) => {
            state.action = action.payload
            state.loading = false;
        })
        builder.addMatcher(isLoading, (state, action) => {
            state.loading = true;
        })
    }
})

export const {
    sortProducts,

} = productsSlice.actions

export default productsSlice.reducer