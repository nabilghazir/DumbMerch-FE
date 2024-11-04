import { api } from "../../libs/api";
import { UserEntities } from "../../entities/user-entities";
import { RegisterSchema } from "../../schema/register-schema";
import { createAsyncThunk, SerializedError } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { AxiosError } from "axios";


export const registerAsync = createAsyncThunk<void, RegisterSchema>(
    "/auth/register",
    async (data, thunkAPI) => {
        try {
            const res = await api.post("/auth/register", data);

            console.log("Ini response", res)
            console.log(res.data);

            toast.success("Register Success!");
        } catch (error) {
            console.log(error);
            if (error instanceof Error) {
                toast.error(error.response?.data.message);
                return thunkAPI.rejectWithValue(error.message);
            }
        }
    }
);

export const loginAsync = createAsyncThunk<
    { token: string; user: UserEntities },
    { email: string; password: string }
>("auth/login", async (data, thunkAPI) => {
    try {
        const res = await api.post("/auth/login", data);
        console.log(res.data);
        const { token, user } = res.data;
        localStorage.setItem("token", token);
        return { token, user };
    } catch (error) {
        console.log(error);
        if (error instanceof AxiosError && error.response) {
            toast.error(error.response?.data.message);
            return thunkAPI.rejectWithValue(error.message);
        }
    }
});


export const checkAuth = createAsyncThunk<
    {
        user: UserEntities;
        token: string;
    },
    undefined
>("auth/checkAuth", async (_, thunkAPI) => {
    try {
        const token = localStorage.getItem("token");
        if (!token) {
            return thunkAPI.rejectWithValue("");
        }
        const res = await api.get("/auth/auth-check");

        if (!res.data) {
            return thunkAPI.rejectWithValue("no user");
        }

        return {
            user: res.data,
            token: token,
        };
    } catch (error) {
        console.log(error);
        if (error instanceof Error) {
            toast.error(error.response?.data.message);
            return thunkAPI.rejectWithValue(error.message);
        }
    }
});
