import { useEffect } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Paper } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { CartItem } from "./cart-item";
import { fetchCart } from "../../store/cart/asyncThunk";

export const CartItems = () => {
    const dispatch = useAppDispatch();
    const cartState = useAppSelector((state) => state.cart.cart);
    const authState = useAppSelector((state) => state.auth);

    useEffect(() => {
        if (authState.user?.id) {
            dispatch(fetchCart(cartState!.cartId));
        }
    }, [authState.user?.id, dispatch]);

    const items = cartState?.items || [];

    return (
        <TableContainer component={Paper} elevation={0}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>No</TableCell>
                        <TableCell>Image</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Price</TableCell>
                        <TableCell>Quantity</TableCell>
                        <TableCell>Total</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {items.length > 0 ? (
                        items.map((item, index) => (
                            <CartItem
                                key={item.productId}
                                item={item}
                                cartId={cartState!.cartId}
                                index={index + 1}
                            />
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={6}>
                                <Typography variant="h6" align="center">
                                    No items in cart
                                </Typography>
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    );
};
