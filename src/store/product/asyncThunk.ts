import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../libs/api";
import { CreateProductEntities } from "../../schema/product-schema";
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

export const createProduct = createAsyncThunk<void, CreateProductEntities>(
    "product/createProduct",
    async (data, ThunkAPI) => {
        try {
            if (!data || typeof data !== 'object') {
                throw new Error("Invalid data provided");
            }

            const formData = new FormData();
            Object.entries(data).forEach(([key, value]) => {
                if (key === "productImages" && value instanceof FileList) {
                    Array.from(value).forEach((file) => {
                        formData.append("productImages", file);
                    });
                } else {
                    formData.append(key, String(value));
                }
            });

            const res = await api.post("/product/create", formData);

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

export const updateProduct = createAsyncThunk<void, { id: number; data: CreateProductEntities }>(
    "product/updateProduct",
    async ({ id, data }, ThunkAPI) => {
        try {
            if (!data || typeof data !== 'object') {
                throw new Error("Invalid data provided");
            }

            const formData = new FormData();
            Object.entries(data).forEach(([key, value]) => {
                if (key === "productImages" && value instanceof FileList) {
                    Array.from(value).forEach((file) => {
                        formData.append("productImages", file);
                    });
                } else {
                    formData.append(key, String(value));
                }
            });

            const res = await api.put(`/product/update/${id}`, formData);

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