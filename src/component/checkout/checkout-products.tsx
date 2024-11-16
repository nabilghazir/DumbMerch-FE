import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Paper, Typography, Stack } from '@mui/material';
import { getTransactionById } from '../../store/transaction/asyncThunk';
import { useAppDispatch, useAppSelector } from '../../store/store';
import customTheme from '../../theme/theme';

export const CheckoutProduct = () => {
    const { transactionId } = useParams<{ transactionId: string }>();
    const dispatch = useAppDispatch();
    const transaction = useAppSelector((state) => state.transaction);

    console.log("Transaction : ", transaction);

    // Safely check if currentTransaction and cart are defined
    const cartItems = transaction.currentTransaction?.cart?.cartItems || [];
    console.log("Cart Items", cartItems);

    useEffect(() => {
        if (transactionId) {
            dispatch(getTransactionById(Number(transactionId)));
        }
    }, [dispatch, transactionId]);

    return (
        <Paper elevation={3} sx={{ padding: "20px", width: "100%", borderRadius: "20px" }}>
            <Typography variant="h5" gutterBottom>
                Products
            </Typography>
            {cartItems.length > 0 ? (
                <Stack spacing={2}>
                    {cartItems.map((item, index) => (
                        <Stack key={index} direction="row" alignItems="center" sx={{ gap: "30px" }}>
                            <img
                                src={item.product.productImages?.[0]?.url || ""}
                                alt={item.product.name}
                                style={{
                                    width: 100,
                                    height: 100,
                                    objectFit: 'contain',
                                    border: "2px solid" + customTheme.palette.grey[800],
                                    borderRadius: "10px",
                                    padding: "5px",
                                }}
                            />
                            <Stack
                                sx={{
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                    width: "100%",
                                    alignItems: "center",
                                }}
                            >
                                <Typography variant="h6">{item.product.name}</Typography>
                                <Typography variant="body1">
                                    {item.quantity} x {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(item.product.price)}
                                </Typography>
                            </Stack>
                        </Stack>
                    ))}
                </Stack>
            ) : (
                <Typography variant="body1">No items in the cart.</Typography>
            )}
        </Paper>
    );
};
