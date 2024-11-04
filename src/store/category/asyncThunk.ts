import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../libs/api";
import { CategoryFormData } from "../../schema/category-schema";
import { toast } from "react-toastify";
import { AxiosError } from "axios";


export const getAllCategory = createAsyncThunk(
    "category/getAllCategory",
    async (_, ThunkAPI) => {
        try {
            const res = await api.get("/category/getallcategory")

            console.log("Profile Data : ", res.data);

            return res.data
        } catch (error) {
            console.log(error as Error);
            return ThunkAPI.rejectWithValue(error.message);
        }
    }
)

export const createCategory = createAsyncThunk<void, CategoryFormData>(
    "product/createCategory",
    async (data, ThunkAPI) => {
        try {
            const res = await api.post("/category/create", data);
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

export const updateCategory = createAsyncThunk<void, { data: CategoryFormData; categoryId: number }>(
    "product/updateCategory",
    async ({ data, categoryId }, ThunkAPI) => {
        try {
            const res = await api.put(`/category/update/${categoryId}`, data);
            console.log("Profile Data : ", res.data);

        } catch (error) {
            console.log(error);
            if (error instanceof Error) {
                toast.error(error.response?.data.message);
                return ThunkAPI.rejectWithValue(error.message);
            }
        }
    }
)

export const deleteCategory = createAsyncThunk<void, number>(
    "product/deleteCategory",
    async (categoryId, ThunkAPI) => {
        try {
            const res = await api.delete(`/category/delete/${categoryId}`);
            console.log("Profile Data : ", res.data);

        } catch (error) {
            console.log(error);
            if (error instanceof Error) {
                toast.error(error.response?.data.message);
                return ThunkAPI.rejectWithValue(error.message);
            }
        }
    }
)