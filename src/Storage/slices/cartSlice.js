import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    cartList: [],
    product: {},
    qty: 0,
    availability: false,
}

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addUnit(state, action) {
            const item = state.cartList.find(e => e.product._id === action.payload.product._id)
            if (item) {
                item.qty = item.qty + action.payload.qty
            } else {
                state.cartList = [...state.cartList, action.payload]
            }
            localStorage.setItem("cart", JSON.stringify(state.cartList))
        },
        reduceUnit(state, action) {
            const item = state.cartList.find(e => e.product._id === action.payload.product._id)
            item.qty = item.qty - action.payload.qty
            localStorage.setItem("cart", JSON.stringify(state.cartList))
        },
        deleteUnit(state, action) {
            const unitListInState = JSON.parse(localStorage.getItem("cart"))
            state.cartList = unitListInState.filter(el => el.product._id !== action.payload._id)
            localStorage.setItem("cart", JSON.stringify(state.cartList))
        },
        cartFromLocal(state, action) {
            state.cartList = action.payload
        }
    },

    extraReducers: builder => {
    }
})

export const {addUnit, deleteUnit, reduceUnit, cartFromLocal} = cartSlice.actions

export default cartSlice.reducer