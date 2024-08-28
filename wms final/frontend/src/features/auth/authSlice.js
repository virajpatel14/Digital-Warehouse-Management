import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import authService from "./authService"

const getUserFromLocalStorage = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user")) : null

const initialState = {
    user: getUserFromLocalStorage,
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: ","
}

export const login = createAsyncThunk('auth/login', async (userData, thunkAPI) => {
    try {
        return await authService.login(userData)
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

export const signup = createAsyncThunk('auth/signup', async (userData, thunkAPI) => {
    try {
        return await authService.signup(userData)
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

export const authslice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.isLoading = true
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isError = false
                state.isLoading = false
                state.isSuccess = true
                state.user = action.payload
                state.message = "success"
            })
            .addCase(login.rejected, (state, action) => {
                state.isError = true
                state.isSuccess = false
                state.message = action.error
                state.isLoading = false
            })
            .addCase(signup.pending, (state) => {
                state.isLoading = true
            })
            .addCase(signup.fulfilled, (state, action) => {
                state.isError = false
                state.isLoading = false
                state.isSuccess = true
                state.user = action.payload
                state.message = "success"
            })
            .addCase(signup.rejected, (state, action) => {
                state.isError = true
                state.isSuccess = false
                state.message = action.error
                state.isLoading = false
            })
    }
})

export default authslice.reducer
