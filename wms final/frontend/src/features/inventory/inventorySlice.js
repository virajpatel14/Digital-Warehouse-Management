import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import inventoryService from "./inventoryService";

export const getAllProducts = createAsyncThunk(
    'inventory/getAllProducts',
    async (_, thunkAPI) => {
        try {
            return await inventoryService.getAllProduct();
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const addProduct = createAsyncThunk(
    'inventory/addProduct',
    async (id, thunkAPI) => {
        try {
            return await inventoryService.addProduct(id);
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const deleteProduct = createAsyncThunk(
    'inventory/deleteProduct',
    async (id, thunkAPI) => {
        try {
            return await inventoryService.deleteProduct(id);
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const resetState = createAction("ResetState");

const initialState = {
    products: [],
    addedProduct: {},
    deletedProduct: {},
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: "",
};

const inventorySlice = createSlice({
    name: "inventory",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllProducts.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAllProducts.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.products = action.payload;
            })
            .addCase(getAllProducts.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error.message;
            })
            .addCase(addProduct.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(addProduct.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.addedProduct = action.payload;
            })
            .addCase(addProduct.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error.message;
            })
            .addCase(deleteProduct.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.deletedProduct = action.payload;
            })
            .addCase(deleteProduct.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error.message;
            });
    },
});

export default inventorySlice.reducer;
// export { getAllProducts, addProduct, deleteProduct, resetState };
