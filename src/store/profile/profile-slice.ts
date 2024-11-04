import { createSlice } from "@reduxjs/toolkit";
import { ProfileEntities } from "../../entities/profile-entities";
import { getProfile } from "./asyncThunk";

export interface ProfileState {
    id?: number;
    name?: string;
    loading?: boolean;
    profile?: ProfileEntities
}

const initialState: ProfileState = {
    id: 0,
    name: "",
    loading: false,
    profile: undefined
}

const profileSlice = createSlice({
    name: "profile",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getProfile.fulfilled, (state, action) => {
                state.loading = false;
                state.id = action.payload.id;
                state.name = action.payload.name;
                state.profile = action.payload;
            })

            .addCase(getProfile.pending, (state) => {
                state.loading = true;
            })
            .addCase(getProfile.rejected, (state) => {
                state.loading = false;
            })
    }
})

export default profileSlice.reducer