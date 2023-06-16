import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {getUser} from "../../Utils/api";
import {isError, isLoading} from "../utils/utils.js";

const initialState = {
    user: {},
    loading: false,
}


export const getUserInfo = createAsyncThunk("getUser", async function (data, arg) {
    try {
        const data = await getUser();
        return arg.fulfillWithValue(data);
    } catch (error) {

    }
})


const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getUserInfo.fulfilled, (state, action) => {
            state.user = action.payload;
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


export default userSlice.reducer;