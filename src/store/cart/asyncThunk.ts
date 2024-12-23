import { createAsyncThunk } from "@reduxjs/toolkit";
import { CartEntity } from "../../entities/cart-entities";
import { api } from "../../libs/api";
import { AddProductToCartDTO, UpdateProductQuantityDTO } from "../../entities/cart-dto";
import { AxiosError } from "axios";
import { toast } from "react-toastify";

export const fetchCart = createAsyncThunk<CartEntity>(
    'cart/fetchCart',
    async (_, ThunkAPI) => {
        try {
            const response = await api.get("/cart/get-cart");
            return response.data;
        } catch (error) {
            console.log(error);
            if (error instanceof AxiosError && error.response) {
                toast.error(error.response?.data.message);
                return ThunkAPI.rejectWithValue(error.message);
            } else {
                const err = error as Error;
                return ThunkAPI.rejectWithValue(err.message);
            }
        }
    }
);

export const addProductToCart = createAsyncThunk<CartEntity, AddProductToCartDTO>(
    'cart/addProductToCart',
    async (productData, ThunkAPI) => {
        try {
            const response = await api.post(`/cart/add-product`, productData);
            return response.data;
        } catch (error) {
            console.log(error);
            if (error instanceof AxiosError && error.response) {
                toast.error(error.response?.data.message);
                return ThunkAPI.rejectWithValue(error.message);
            } else {
                const err = error as Error;
                return ThunkAPI.rejectWithValue(err.message);
            }
        }
    }
);

export const updateProductQuantity = createAsyncThunk<CartEntity, UpdateProductQuantityDTO>(
    'cart/updateProductQuantity',
    async (updateData, ThunkAPI) => {
        try {
            const response = await api.put(`/cart/update-quantity`, updateData);
            return response.data;
        } catch (error) {
            console.log(error);
            if (error instanceof AxiosError && error.response) {
                toast.error(error.response?.data.message);
                return ThunkAPI.rejectWithValue(error.message);
            } else {
                const err = error as Error;
                return ThunkAPI.rejectWithValue(err.message);
            }
        }
    }
);

export const clearCart = createAsyncThunk<CartEntity, number>(
    'cart/clearCart',
    async (cartId, ThunkAPI) => {
        try {
            const response = await api.delete(`/cart/clear/${cartId}`);
            return response.data;
        } catch (error) {
            console.log(error);
            if (error instanceof AxiosError && error.response) {
                toast.error(error.response?.data.message);
                return ThunkAPI.rejectWithValue(error.message);
            } else {
                const err = error as Error;
                return ThunkAPI.rejectWithValue(err.message);
            }
        }
    }
);
