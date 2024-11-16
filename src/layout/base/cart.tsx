import { Button, Stack, Typography } from "@mui/material";
import { CartItems } from "../../component/cart/cart-items";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { fetchCart } from "../../store/cart/asyncThunk";

export const Cart = () => {
    const dispatch = useAppDispatch();
    const cartState = useAppSelector((state) => state.cart.cart);



    useEffect(() => {
        if (cartState?.userId) {
            dispatch(fetchCart());
        }
    }, [dispatch, cartState?.userId]);

    return (
        <Stack
            sx={{
                width: "100%",
                height: "100%",
                alignItems: "center",
            }}>
            <Stack
                sx={{
                    marginTop: "100px",
                    marginBottom: "100px",
                    width: "90%",
                    flexDirection: "column",
                    justifyContent: "center",
                    gap: "30px"
                }}>
                <Typography variant="h3">
                    Shopping Cart
                </Typography>
                <Stack>
                    <CartItems />
                </Stack>

                <Button>
                </Button>
            </Stack>
        </Stack>
    );
};
