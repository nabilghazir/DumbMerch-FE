import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../libs/api";
import { AxiosError } from "axios";
import { toast } from "react-toastify";


export const getAllProduct = createAsyncThunk(
    "product/getAllProduct",
    async (_, ThunkAPI) => {
        try {
            const res = await api.get("/product/getallproduct")

            console.log("Profile Data : ", res.data);

            return res.data
        } catch (error) {
            console.log(error as Error);
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
)

export const createProduct = createAsyncThunk<void, FormData>(
    "product/createProduct",
    async (formData, ThunkAPI) => {
        try {
            const res = await api.post("/product/create", formData);
            return res.data; // Make sure this matches your API's return type
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


export const updateProduct = createAsyncThunk<void, { id: number; data: FormData }>(
    "product/updateProduct",
    async ({ id, data }, ThunkAPI) => {
        try {
            const res = await api.put(`/product/update/${id}`, data);
            return res.data;
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


export const deleteProduct = createAsyncThunk<void, number>(
    "product/deleteProduct",
    async (id, ThunkAPI) => {
        try {
            const res = await api.delete(`/product/delete/${id}`);
            console.log("Profile Data : ", res.data);

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
)