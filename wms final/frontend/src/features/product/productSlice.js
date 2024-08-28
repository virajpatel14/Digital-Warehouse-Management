import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import productService from "./productService";

export const getProducts = createAsyncThunk(
    'products/get-products',
    async (thunkAPI) => {
        try {
            return await productService.getProducts();
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);
export const getAProduct = createAsyncThunk(
    'products/get-a-product',
    async (id, thunkAPI) => {
        try {
            return await productService.getOneProduct(id);
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const getAProductById = createAsyncThunk(
    'products/get-a-product-by-id',
    async (id, thunkAPI) => {
        try {
            return await productService.getOneProductById(id);
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const createProducts = createAsyncThunk(
    'products/create-products',
    async (productData, thunkAPI) => {
        try {
            return await productService.createProduct(productData);
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);
export const updateProducts = createAsyncThunk(
    'products/update-products',
    async (productData, thunkAPI) => {
        try {
            return await productService.updateProduct(productData);
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const deleteProducts = createAsyncThunk(
    'products/delete-products',
    async (id, thunkAPI) => {
        try {
            return await productService.deleteProduct(id);
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);
export const resetState = createAction("ResetState");

const initialState = {
    products: [],
    oneproduct: {},
    getAProductById: {},
    createdProduct: {},
    updatedProduct: {},
    deletedProduct: {},
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: "",
};

export const productSlice = createSlice({
    name: "products",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getProducts.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getProducts.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.products = action.payload;
            })
            .addCase(getProducts.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error.message;
            })
            .addCase(createProducts.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createProducts.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.createdProduct = action.payload;
            })
            .addCase(createProducts.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error.message;
            })
            .addCase(getAProduct.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAProduct.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.oneproduct = action.payload;
            })
            .addCase(getAProduct.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error.message;
            })
            .addCase(getAProductById.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAProductById.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.oneproductById = action.payload;
            })
            .addCase(getAProductById.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error.message;
            })
            .addCase(updateProducts.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateProducts.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.updatedProduct = action.payload;
            })
            .addCase(updateProducts.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error.message;
            })
            .addCase(deleteProducts.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteProducts.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.deletedProduct = action.payload;
            })
            .addCase(deleteProducts.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error.message;
            })
            .addCase(resetState, () => initialState);
    },
});

export default productSlice.reducer;
