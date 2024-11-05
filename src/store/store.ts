import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";

import authReducer from "./auth/auth-slice";
import profileReducer from "./profile/profile-slice"
import categoryReducer from "./category/category-slice"
import productReducer from "./product/product-slice"
import cartReducer from "./cart/cart-slice"



const store = configureStore({
    reducer: {
        auth: authReducer,
        profile: profileReducer,
        category: categoryReducer,
        product: productReducer,
        cart: cartReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;


export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();

export default store;
