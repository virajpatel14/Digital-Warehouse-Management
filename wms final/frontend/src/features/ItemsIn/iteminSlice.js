import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import iteminService from "./iteminService"; // Adjusted import path

// Async thunk to fetch all removed products
export const getAllAddedProducts = createAsyncThunk(
    'itemin/getAllAddedProducts',
    async (_, thunkAPI) => {
        try {
            return await iteminService.getAllAddedProduct();
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
    addedProducts:[], // Ensure products array is initialized
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: "",
};


// Create slice
const iteminSlice = createSlice({
    
    name: "itemin",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllAddedProducts.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
                state.isSuccess = false;
                state.message = "";
            })
            .addCase(getAllAddedProducts.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.addedProducts = action.payload;
            })
            .addCase(getAllAddedProducts.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error.message;
            });
    },
});

// Reducer export
export default iteminSlice.reducer;