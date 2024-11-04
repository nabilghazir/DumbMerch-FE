import { createSlice } from "@reduxjs/toolkit";
import { getAllCategory, createCategory, updateCategory, deleteCategory } from "./asyncThunk";
import { CategoriesEntities } from "../../entities/categories-entities";

export interface CategoryState {
    categories?: CategoriesEntities[];
    loading?: boolean;
}

const initialState: CategoryState = {
    categories: undefined,
    loading: false,
};

const categorySlice = createSlice({
    name: "category",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllCategory.pending, (state) => {
                state.loading = true;
            })
            .addCase(getAllCategory.fulfilled, (state, action) => {
                state.loading = false;
                state.categories = action.payload;
            })
            .addCase(getAllCategory.rejected, (state) => {
                state.loading = false;
            })

            .addCase(createCategory.pending, (state) => {
                state.loading = true;
            })
            .addCase(createCategory.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(createCategory.rejected, (state) => {
                state.loading = false;
            })

            .addCase(updateCategory.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateCategory.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(updateCategory.rejected, (state) => {
                state.loading = false;
            })

            .addCase(deleteCategory.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteCategory.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(deleteCategory.rejected, (state) => {
                state.loading = false;
            });
    }
});

export default categorySlice.reducer;
