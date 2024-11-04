import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../libs/api";


export const getProfile = createAsyncThunk(
    "profile/getProfile",
    async (_, ThunkAPI) => {
        try {
            const res = await api.get("/profile/get")

            console.log("Profile Data : ", res.data);

            return res.data
        } catch (error) {
            console.log(error as Error);
            return ThunkAPI.rejectWithValue(error.message);
        }
    }
)