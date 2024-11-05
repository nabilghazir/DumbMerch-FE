import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartEntity } from "../../entities/cart-entities";
import { fetchCart, addProductToCart, updateProductQuantity, clearCart } from "./asyncThunk";

interface CartState {
    cart: CartEntity | null;
    loading: boolean;
    error: string | null;
}

const initialState: CartState = {
    cart: null,
    loading: false,
    error: null,
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        resetCart: (state) => {
            state.cart = null;
            state.error = null;
        },
    },
    extraReducers: (builder) => {

        builder.addCase(fetchCart.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(fetchCart.fulfilled, (state, action: PayloadAction<CartEntity>) => {
            state.cart = action.payload;
            state.loading = false;
        });
        builder.addCase(fetchCart.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        });

        builder.addCase(addProductToCart.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(addProductToCart.fulfilled, (state, action: PayloadAction<CartEntity>) => {
            state.cart = action.payload;
            state.loading = false;
        });
        builder.addCase(addProductToCart.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        });

        builder.addCase(updateProductQuantity.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(updateProductQuantity.fulfilled, (state, action: PayloadAction<CartEntity>) => {
            state.cart = action.payload;
            state.loading = false;
        });
        builder.addCase(updateProductQuantity.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        });

        builder.addCase(clearCart.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(clearCart.fulfilled, (state, action: PayloadAction<CartEntity>) => {
            state.cart = action.payload;
            state.loading = false;
        });
        builder.addCase(clearCart.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        });
    },
});

export const { resetCart } = cartSlice.actions;

export default cartSlice.reducer;
