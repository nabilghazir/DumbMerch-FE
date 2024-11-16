import { combineReducers } from "redux";
import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import authReducer from "./auth/auth-slice";
import profileReducer from "./profile/profile-slice";
import categoryReducer from "./category/category-slice";
import productReducer from "./product/product-slice";
import cartReducer from "./cart/cart-slice";
import transactionReducer from "./transaction/transaction-slice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const rootReducer = combineReducers({
    auth: authReducer,
    profile: profileReducer,
    category: categoryReducer,
    product: productReducer,
    cart: cartReducer,
    transaction: transactionReducer,
});

const persistConfig = {
    key: "root",
    storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
});

const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export { persistor };
export default store;
