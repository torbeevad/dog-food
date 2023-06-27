import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {
    changeAvatar, changeProfile,
    forgotPassword,
    getEnter,
    getRegistration,
    getUser,
    resetPassword
} from "../../Utils/api/apiUser";
import {notification} from "antd";

const initialState = {
    user: {},
    isLogin: true,
    isActiveModal: true,
}

export const fetchGetAuthorization = createAsyncThunk("user/fetchGetAuthorization", async function (data, arg) {
    try {
        const result = await getEnter(data)
        return arg.fulfillWithValue(result)
    } catch (error) {
        notification.error({message: error.message, duration: 2,})
        return arg.rejectWithValue(error)
    }
})

export const fetchGetUserInfo = createAsyncThunk("user/fetchGetUserInfo", async function (data, arg) {
    try {
        const result = await getUser();
        return arg.fulfillWithValue(result);
    } catch (error) {
        notification.error({message: error.message, duration: 2,})
        return arg.rejectWithValue(error)
    }
})

export const fetchGetRegistration = createAsyncThunk("user/fetchGetRegistration", async function (data, arg) {
    try {
        const result = await getRegistration(data);
        return arg.fulfillWithValue(result);
    } catch (error) {
        notification.error({message: error.message, duration: 2,})
        return arg.rejectWithValue(error)
    }
})

export const fetchForgotPassword = createAsyncThunk("user/fetchForgotPassword", async function (data, arg) {
    try {
        const result = await forgotPassword(data);
        return arg.fulfillWithValue(result);
    } catch (error) {
        notification.error({message: error.message, duration: 2,})
        return arg.rejectWithValue(error)
    }
})

export const fetchResetPassword = createAsyncThunk("user/fetchResetPassword", async function (data, arg) {
    try {
        const result = await resetPassword(data);
        return arg.fulfillWithValue(result);
    } catch (error) {
        notification.error({message: error.message, duration: 2,})
        arg.rejectWithValue(error)
    }
})

export const fetchChangeAvatar = createAsyncThunk("user/fetchChangeAvatar", async function (data, arg) {
    try {
        const result = await changeAvatar(data);
        return arg.fulfillWithValue(result);
    } catch (error) {
        notification.error({message: error.message, duration: 2,})
        arg.rejectWithValue(error)
    }
})
export const fetchChangeProfile = createAsyncThunk("user/fetchChangeProfile", async function (data, arg) {
    try {
        const result = await changeProfile(data);
        return arg.fulfillWithValue(result);
    } catch (error) {
        notification.error({message: error.message, duration: 2,})
        arg.rejectWithValue(error)
    }
})

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setIsLogin(state, {payload}) {
            state.isLogin = payload;
        },
        setModalActive(state, {payload}) {
            state.isActiveModal = payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchGetAuthorization.fulfilled, (state, {payload}) => {
            state.user = payload.data;
            localStorage.setItem("token", payload.token);
            state.isLogin = true;
            state.isModalActive = false;
            notification.success({message: "Добро пожаловать", duration: 2,})
        })
        builder.addCase(fetchGetUserInfo.fulfilled, (state, {payload}) => {
            state.user = payload;
        })
        builder.addCase(fetchGetRegistration.fulfilled, (state, {payload}) => {
            state.user = payload;
            notification.success({message: "Вы успешно зарегестрировались!", duration: 2,})
        })
        builder.addCase(fetchForgotPassword.fulfilled, (state, {payload}) => {
            notification.success({message: payload.message, duration: 2,})
        })
        builder.addCase(fetchResetPassword.fulfilled, (state, {payload}) => {
            state.user = payload.data;
            notification.success({message: "Пароль успешно обновлен!", duration: 2,})
        })
        builder.addCase(fetchChangeAvatar.fulfilled, (state, {payload}) => {
            state.user = payload;
            notification.success({message: "Аватар успешно обновлен!", duration: 2,})
        })
        builder.addCase(fetchChangeProfile.fulfilled, (state, {payload}) => {
            state.user = payload;
            notification.success({message: "Данные профиля обновлены!", duration: 2,})
        })
    }
})

export const {setIsLogin, setModalActive} = userSlice.actions

export default userSlice.reducer;