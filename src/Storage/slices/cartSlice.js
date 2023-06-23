import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    cartList: [],
    product: {},
    availability: false,
}

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
        }
    },

    extraReducers: builder => {
    }
})

export const {addUnit, deleteUnit, reduceUnit, cartFromLocal} = cartSlice.actions

export default cartSlice.reducer