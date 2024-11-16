import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../libs/api";
import { AxiosError } from "axios";
import { toast } from "react-toastify";


export const getProfile = createAsyncThunk(
    "profile/getProfile",
    async (_, ThunkAPI) => {
        try {
            const res = await api.get("/profile/get")
            return res.data
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