import { useEffect } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Paper, Button, Stack } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { CartItem } from "./cart-item";
import { clearCart, fetchCart } from "../../store/cart/asyncThunk";
import { createTransaction } from "../../store/transaction/asyncThunk";
import { getTransactionByCartId } from "../../store/transaction/asyncThunk";
import { CreateTransactionDTO } from "../../entities/transaction-entities";
import { getProfile } from "../../store/profile/asyncThunk";
import { useNavigate } from "react-router-dom";

export const CartItems = () => {
    const dispatch = useAppDispatch();
    const cartState = useAppSelector((state) => state.cart.cart);
    const transactionState = useAppSelector((state) => state.transaction);
    const authState = useAppSelector((state) => state.auth);
    const profileState = useAppSelector((state) => state.profile);
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getProfile());
        dispatch(fetchCart());
    }, [authState.user?.id, dispatch]);

    const items = cartState?.items || [];

    const handleCreateTransaction = async () => {
        if (cartState) {
            const cartId = cartState.id;
            try {
                const existingTransaction = await dispatch(getTransactionByCartId(cartId));
                console.log("Existing Transaction:", existingTransaction);

                if (getTransactionByCartId.fulfilled.match(existingTransaction)) {
                    const transactionId = existingTransaction.payload.id;
                    navigate(`/transaction/${transactionId}`);
                } else {
                    const fetchShipTo: CreateTransactionDTO = {
                        shipTo: profileState.profile?.address || null,
                    };
                    const actionResult = await dispatch(createTransaction(fetchShipTo));
                    if (createTransaction.fulfilled.match(actionResult)) {
                        const transactionId = actionResult.payload.id;
                        // Clear the cart in the frontend
                        dispatch(clearCart(cartId));  // Dispatch action to clear the cart

                        // Navigate to transaction page
                        navigate(`/transaction/${transactionId}`);
                    }
                }
            } catch (error) {
                console.error("Error handling transaction:", error);
            }
        }
    };


    const formatCurrency = (amount: number) =>
        new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
        }).format(amount);

    return (
        <Stack spacing={2}>
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
                                    id={cartState!.id}
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
            <Typography
                variant="h5"
                sx={{
                    textAlign: "end"
                }}>
                Total: {formatCurrency(cartState?.totalPrice ?? 0)}
            </Typography>

            <Button
                variant="contained"
                color="primary"
                onClick={handleCreateTransaction}
                sx={{ alignSelf: "flex-end", mt: 2 }}
                disabled={items.length === 0 || transactionState.loading}
            >
                {transactionState.loading ? 'Creating Transaction...' : 'Create Transaction'}
            </Button>
        </Stack>
    );
};
