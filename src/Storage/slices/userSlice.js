import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {getEnter, getUser} from "../../Utils/api";
import {isError, isLoading} from "../utils/utils.js";

const initialState = {
    user: {},
    loading: false,
    isLogin: false,
}

export const getAuthorization = createAsyncThunk("user/getAuthorization", async function (data, arg) {
    try {
        const result = await getEnter(data)
        return arg.fulfillWithValue(result)
    } catch (error) {
        return arg.rejectWithValue(error)
    }
})

export const getUserInfo = createAsyncThunk("user/getUser", async function (data, arg) {
    try {
        const data = await getUser();
        return arg.fulfillWithValue(data);
    } catch (error) {

    }
})


const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setIsLogin(state, action) {
            state.isLogin = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getAuthorization.fulfilled, (state, action) => {
            state.user = action.payload.data
            localStorage.setItem("token", action.payload.token)
            state.isLogin = true
            state.loading = false;
        })
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

export const {setIsLogin} = userSlice.actions

export default userSlice.reducer;