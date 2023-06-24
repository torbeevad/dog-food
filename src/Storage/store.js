import {configureStore} from "@reduxjs/toolkit";
import productsSlice from "./slices/productsSlice";
import userSlice from "./slices/userSlice";
import reviewsSlice from "./slices/reviewsSlice";
import cartSlice from "./slices/cartSlice";


const store = configureStore({
    reducer: {
        user: userSlice,
        products: productsSlice,
        reviews: reviewsSlice,
        cart: cartSlice,
    }
})

export default store;