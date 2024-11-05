import { createSlice } from "@reduxjs/toolkit";
import { getAllProduct, createProduct, updateProduct, deleteProduct } from "./asyncThunk";
import { ProductEntities } from "../../entities/product-entitities";

export interface ProductState {
    products?: ProductEntities[];
    loading?: boolean;
    error?: string | null;
}

const initialState: ProductState = {
    products: undefined,
    loading: false,
    error: null,
};

const productSlice = createSlice({
    name: "product",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllProduct.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllProduct.fulfilled, (state, action) => {
                state.loading = false;
                state.products = action.payload;
            })
            .addCase(getAllProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            .addCase(createProduct.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createProduct.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(createProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            .addCase(updateProduct.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateProduct.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(updateProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            .addCase(deleteProduct.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteProduct.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(deleteProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    }
});

export default productSlice.reducer;
