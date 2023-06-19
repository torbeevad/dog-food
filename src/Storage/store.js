import {configureStore} from "@reduxjs/toolkit";
import productsSlice from "./slices/productsSlice";
import userSlice from "./slices/userSlice";
import reviewsSlice from "./slices/reviewsSlice";
import cartSlice from "./slices/cartSlice";
import counterSlice from "./slices/counterSlice";


const store = configureStore({
    reducer: {
        user: userSlice,
        products: productsSlice,
        reviews: reviewsSlice,
        cart: cartSlice,
        counter: counterSlice,
    }
})

export default store;