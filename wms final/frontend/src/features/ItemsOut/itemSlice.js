import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import itemService from "./itemService"; // Adjusted import path

// Async thunk to fetch all removed products
export const getAllRemovedProducts = createAsyncThunk(
    'item/getAllRemovedProducts',
    async (_, thunkAPI) => {
        try {
            return await itemService.getAllRemovedProduct();
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

// Export fetchRemovedProducts (alias for getAllRemovedProducts)
// export const fetchRemovedProducts = getAllRemovedProducts;

// Action to reset state
export const resetState = createAction("ResetState");

// Initial state
const initialState = {
    // products: [],
    removedProducts:[], // Ensure products array is initialized
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: "",
};


// Create slice
const itemSlice = createSlice({
    
    name: "item",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllRemovedProducts.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
                state.isSuccess = false;
                state.message = "";
            })
            .addCase(getAllRemovedProducts.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.removedProducts = action.payload;
            })
            .addCase(getAllRemovedProducts.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error.message;
            });
    },
});

// Reducer export
export default itemSlice.reducer;
