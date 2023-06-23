import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {
    changeAvatar, changeProfile,
    forgotPassword,
    getEnter,
    getRegistration,
    getUser,
    resetPassword
} from "../../Utils/api/apiUser";
import {isError, isLoading} from "../utils/utils.js";

const initialState = {
    user: {},
    loading: false,
    isLogin: true,
    isActiveModal: true,
}

export const fetchGetAuthorization = createAsyncThunk("user/fetchGetAuthorization", async function (data, arg) {
    try {
        const result = await getEnter(data)
        return arg.fulfillWithValue(result)
    } catch (error) {
        return arg.rejectWithValue(error)
    }
})

export const fetchGetUserInfo = createAsyncThunk("user/fetchGetUserInfo", async function (data, arg) {
    try {
        const result = await getUser();
        return arg.fulfillWithValue(result);
    } catch (error) {
        return arg.rejectWithValue(error)
    }
})

export const fetchGetRegistration = createAsyncThunk("user/fetchGetRegistration", async function (data, arg) {
    try {
        const result = await getRegistration(data);
        return arg.fulfillWithValue(result);
    } catch (error) {
        return arg.rejectWithValue(error)
    }
})

export const fetchForgotPassword = createAsyncThunk("user/fetchForgotPassword", async function (data, arg) {
    try {
        const result = await forgotPassword(data);
        return arg.fulfillWithValue(result);
    } catch (error) {
        return arg.rejectWithValue(error)
    }
})

export const fetchResetPassword = createAsyncThunk("user/fetchResetPassword", async function (data, arg) {
    try {
        const result = await resetPassword(data);
        return arg.fulfillWithValue(result);
    } catch (error) {
        arg.rejectWithValue(error)
    }
})

export const fetchChangeAvatar = createAsyncThunk("user/fetchChangeAvatar", async function (data, arg) {
    try {
        const result = await changeAvatar(data);
        return arg.fulfillWithValue(result);
    } catch (error) {
        arg.rejectWithValue(error)
    }
})
export const fetchChangeProfile = createAsyncThunk("user/fetchChangeProfile", async function (data, arg) {
    try {
        const result = await changeProfile(data);
        return arg.fulfillWithValue(result);
    } catch (error) {
        arg.rejectWithValue(error)
    }
})

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setIsLogin(state, action) {
            state.isLogin = action.payload;
        },
        userFromLocal(state, action) {
            state.user = JSON.parse(localStorage.getItem("user"))
        },
        modalActive(state, {payload}) {
            state.isActiveModal = payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchGetAuthorization.fulfilled, (state, {payload}) => {
            state.user = payload.data;
            localStorage.setItem("token", payload.token);
            state.isLogin = true;
            state.loading = false;
        })
        builder.addCase(fetchGetUserInfo.fulfilled, (state, {payload}) => {
            state.user = payload;
            localStorage.setItem("user", JSON.stringify(payload));
            state.loading = false;
        })
        builder.addCase(fetchGetRegistration.fulfilled, (state, {payload}) => {
            state.user = payload;
            state.loading = false;
        })
        builder.addCase(fetchForgotPassword.fulfilled, (state, {payload}) => {
            state.loading = false;
        })
        builder.addCase(fetchResetPassword.fulfilled, (state, {payload}) => {
            state.user = payload.data;
            state.loading = false;
        })
        builder.addCase(fetchChangeAvatar.fulfilled, (state, {payload}) => {
            state.user = payload;
            state.loading = false;
        })
        builder.addCase(fetchChangeProfile.fulfilled, (state, {payload}) => {
            state.user = payload;
            state.loading = false;
        })
        builder.addMatcher(isLoading, (state) => {
            state.loading = true;
        })
        builder.addMatcher(isError, (state, {payload}) => {
            state.error = payload
            state.loading = false;
        })
    }
})

export const {setIsLogin, userFromLocal, modalActive} = userSlice.actions

export default userSlice.reducer;