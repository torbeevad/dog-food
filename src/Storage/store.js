import {configureStore} from "@reduxjs/toolkit";
import productsSlice from "./slices/productsSlice";
import userSlice from "./slices/userSlice";
import reviewsSlice from "./slices/reviewsSlice";


const store = configureStore({
    reducer: {
        user: userSlice,
        products: productsSlice,
        reviews: reviewsSlice,
    }
})

export default store;