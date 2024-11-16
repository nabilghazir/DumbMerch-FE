import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Paper, Typography, Stack, Button } from '@mui/material';
import { getTransactionById } from '../../store/transaction/asyncThunk';
import { useAppDispatch, useAppSelector } from '../../store/store';

export const PaymentSummary = () => {
    const { transactionId } = useParams<{ transactionId: string }>();
    const dispatch = useAppDispatch();
    const transaction = useAppSelector((state) => state.transaction.currentTransaction);

    const cartItems = transaction?.cart?.cartItems || [];
    const totalAmount = transaction?.totalAmount || 0;
    const paymentUrl = transaction?.payment?.paymentUrl;

    useEffect(() => {
        if (transactionId) {
            dispatch(getTransactionById(Number(transactionId)));
        }
    }, [dispatch, transactionId]);

    const handlePaymentRedirect = () => {
        if (paymentUrl) {
            window.location.href = paymentUrl;
        } else {
            console.warn("Payment URL is not available");
        }
    };

    return (
        <Paper
            elevation={3}
            sx={{
                padding: "20px",
                width: "80%",
                borderRadius: "20px",
            }}
        >
            <Typography variant="h5" gutterBottom>
                Payment Summary
            </Typography>

            {cartItems.length > 0 ? (
                <Stack spacing={2}>
                    {cartItems.map((item, index) => (
                        <Stack
                            key={index}
                            direction="row"
                            alignItems="center"
                            sx={{
                                gap: "30px",
                                justifyContent: "space-between",
                            }}
                        >
                            <Typography variant="h6">
                                {item.product.name}
                            </Typography>
                            <Typography variant="body1">
                                {item.quantity} x {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(item.product.price)}
                            </Typography>
                        </Stack>
                    ))}
                    <Typography variant="h6" sx={{ textAlign: "right", mt: 2 }}>
                        Total Amount: {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(totalAmount)}
                    </Typography>
                </Stack>
            ) : (
                <Typography variant="body1">No items in the cart.</Typography>
            )}
            <Button
                variant="contained"
                color="primary"
                onClick={handlePaymentRedirect}
                sx={{ mt: 3 }}
                disabled={!paymentUrl}
            >
                Proceed to Payment
            </Button>
        </Paper>
    );
};
