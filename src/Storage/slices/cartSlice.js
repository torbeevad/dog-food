import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {notification} from "antd";

const initialState = {
    cartList: [],
    product: {},
    availability: false,
}

export const fetchGetPayCart = createAsyncThunk("cart/fetchGetPayCart", async function (data, arg) {
    try {
        const purchases = JSON.parse(data)
        const message = purchases.map(e => <div key={e.product._id}
            dangerouslySetInnerHTML={{__html: `${e.product.name}: ${e.qty} шт.</br>`}}
        />)
        notification.success({message: "Ваш заказ", description: message})
        arg.fulfillWithValue(purchases)
    } catch (error) {
        notification.error({message: error.message})
        arg.rejectWithValue(error)
    }
})

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addUnit(state, {payload}) {
            const item = state.cartList.find(e => e.product._id === payload.product._id)
            if (item) {
                item.qty = item.qty + payload.qty
            } else {
                state.cartList = [...state.cartList, payload]
            }
            localStorage.setItem("cart", JSON.stringify(state.cartList))
        },
        reduceUnit(state, {payload}) {
            const item = state.cartList.find(e => e.product._id === payload.product._id)
            item.qty = item.qty - payload.qty
            localStorage.setItem("cart", JSON.stringify(state.cartList))
        },
        deleteUnit(state, {payload}) {
            const unitListInState = JSON.parse(localStorage.getItem("cart"))
            state.cartList = unitListInState.filter(el => el.product._id !== payload._id)
            localStorage.setItem("cart", JSON.stringify(state.cartList))
        },
        cartFromLocal(state) {
            state.cartList = JSON.parse(localStorage.getItem("cart"))
        },
    },
    extraReducers: builder => {
        builder.addCase(fetchGetPayCart.fulfilled, (state, {payload}) => {
            localStorage.removeItem("cart")
            state.cartList = []
        })
    }
})

export const {addUnit, deleteUnit, reduceUnit, cartFromLocal} = cartSlice.actions

export default cartSlice.reducer