import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import productReducer from "../features/product/productSlice";
import categoryReducer from "../features/category/categorySlice";
import inventoryReducer from "../features/inventory/inventorySlice";
import itemReducer from "../features/ItemsOut/itemSlice"; 
import itemsInReducer from "../features/ItemsIn/iteminSlice"; 


export const store = configureStore({
    reducer: {
        auth: authReducer,
        product: productReducer,
        category: categoryReducer,
        inventory: inventoryReducer,
        item: itemReducer, 
        itemin: itemsInReducer,
    },
});
