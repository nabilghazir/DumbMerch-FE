import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../libs/api";
import { CreateProductEntities } from "../../schema/product-schema";


export const getAllProduct = createAsyncThunk(
    "product/getAllProduct",
    async (_, ThunkAPI) => {
        try {
            const res = await api.get("/product/getallproduct")

            console.log("Profile Data : ", res.data);

            return res.data
        } catch (error) {
            console.log(error as Error);
            return ThunkAPI.rejectWithValue(error.message);
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
            return ThunkAPI.rejectWithValue(error.response?.data || "Failed to create product");
        }
    }
);

