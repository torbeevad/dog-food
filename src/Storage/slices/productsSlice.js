import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {addProduct, deleteProduct, getProductById, getProducts, searchProducts} from "../../Utils/api/apiProducts";
import {isError, isLoading} from "../utils/utils";
import {changeProductLike} from "../../Utils/utils";
import {popular, newest, lowPrice, highPrice, rate, discount} from "../utils/sort";
import {notification} from "antd";


const initialState = {
    loading: false,
    allProducts: [],
    product: {},
    favorites: [],
    myProducts: [],
    searchValue: "",
}

export const fetchGetAllProducts = createAsyncThunk("products/fetchGetAllProducts", async function (data, arg) {
    try {
        const state = arg.getState()
        const data = await getProducts();
        return arg.fulfillWithValue({data, state});
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
        notification.error({message: error.message})
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
        notification.error({message: error.message})
        return arg.rejectWithValue(error);
    }
})
export const fetchSearchProduct = createAsyncThunk("products/fetchSearchProduct", async function (data, arg) {
    try {
        const state = arg.getState();
        const result = await searchProducts(data)
        return arg.fulfillWithValue({state, result});
    } catch (error) {
        notification.error({message: error.message})
        return arg.rejectWithValue(error);
    }
})

export const fetchAddProduct = createAsyncThunk("products/fetchAddProduct", async function (data, arg) {
    try {
        const state = arg.getState();
        const product = await addProduct(data)
        return arg.fulfillWithValue({state, product});
    } catch (error) {
        notification.error({message: error.message})
        return arg.rejectWithValue(error);
    }
})

export const fetchDeleteProduct = createAsyncThunk("products/fetchDeleteProduct", async function (id, arg) {
    try {
        const state = arg.getState();
        const product = await deleteProduct(id)
        return arg.fulfillWithValue({state, product});
    } catch (error) {
        notification.error({message: error.message})
        return arg.rejectWithValue(error);
    }
})


const productsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        sortProducts: (state, {payload}) => {
            switch (payload) {
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
        },
        setSearchValue: (state, {payload}) => {
            state.searchValue = payload
        },
        getMyProductsFromLocal: (state) => {
            state.myProducts = JSON.parse(localStorage.getItem("myProducts"))
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchGetAllProducts.fulfilled, (state, {payload}) => {
            state.allProducts = payload.data.products;
            state.favorites = payload.data.products.filter(e => e.likes.includes(payload.state.user.user._id));
            state.myProducts = payload.data.products.filter(e => e.author._id === payload.state.user.user._id);
            state.loading = false;
        })
        builder.addCase(fetchChangeProductLike.fulfilled, (state, {payload}) => {
            state.product = payload.updatedCard
            const updatedList = payload.state.products.allProducts.map(e => e._id === payload.updatedCard._id ? payload.updatedCard : e)
            state.allProducts = updatedList
            state.favorites = updatedList.filter(e => e.likes.includes(payload.state.user.user._id))
            state.myProducts = payload.state.products.allProducts.filter(e => e._id === payload.state.user.user._id)
            state.loading = false;
        })
        builder.addCase(fetchProduct.fulfilled, (state, {payload}) => {
            state.product = payload.product;
            state.loading = false;
        })
        builder.addCase(fetchSearchProduct.fulfilled, (state, {payload}) => {
            state.allProducts = payload.result
            state.favorites = payload.result.filter(e => e.likes.includes(payload.state.user.user._id))
            state.loading = false;
        })
        builder.addCase(fetchAddProduct.fulfilled, (state, {payload}) => {
            const updatedList = [...payload.state.products.allProducts, payload.product]
            state.allProducts = updatedList
            state.myProducts = updatedList.filter(e => e.author._id === payload.state.user.user._id)
            localStorage.setItem("myProducts", JSON.stringify(state.myProducts))
            state.loading = false;
            notification.success({message: "Товар добавлен!"})
        })
        builder.addCase(fetchDeleteProduct.fulfilled, (state, {payload}) => {
            const updatedList = payload.state.products.allProducts.filter(e => e._id !== payload.product._id)
            state.allProducts = updatedList
            state.myProducts = updatedList.filter(e => e.author._id === payload.state.user.user._id)
            localStorage.setItem("myProducts", JSON.stringify(state.myProducts))
            state.loading = false;
            notification.success({message: "Товар удален!"})
        })
        builder.addMatcher(isError, (state, {payload}) => {
            state.action = payload
            state.loading = false;
        })
        builder.addMatcher(isLoading, (state, action) => {
            state.loading = true;
        })
    }
})

export const {sortProducts, setSearchValue, getMyProductsFromLocal} = productsSlice.actions

export default productsSlice.reducer