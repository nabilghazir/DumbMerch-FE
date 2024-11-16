import React, { useEffect, useState } from "react";
import { Typography, TableRow, TableCell, TextField, IconButton, Stack } from "@mui/material";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import { CartItemProps } from "../../entities/cart-entities";
import { updateProductQuantity } from "../../store/cart/asyncThunk";
import { Icon } from "@iconify/react/dist/iconify.js";
import customTheme from "../../theme/theme";

interface CartItemComponentProps {
    item: CartItemProps;
    id: number;
    index: number;
}

export const CartItem: React.FC<CartItemComponentProps> = ({ item, id, index }) => {
    const dispatch = useDispatch<AppDispatch>();
    const [quantity, setQuantity] = useState(item.quantity);
    const totalItemPrice = item.price * quantity;

    const formatCurrency = (amount: number) =>
        new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
        }).format(amount);

    const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value.replace(/\D/g, "");
        const newQuantity = Math.max(0, Number(value));

        setQuantity(newQuantity);
        if (newQuantity > 0) {
            dispatch(updateProductQuantity({ id, productId: item.productId, quantity: newQuantity }));
        }
    };

    const incrementQuantity = () => {
        const newQuantity = quantity + 1;
        setQuantity(newQuantity);
        dispatch(updateProductQuantity({ id, productId: item.productId, quantity: newQuantity }));
    };

    const decrementQuantity = () => {
        const newQuantity = Math.max(0, quantity - 1);
        setQuantity(newQuantity);

        if (newQuantity > 0) {
            dispatch(updateProductQuantity({ id, productId: item.productId, quantity: newQuantity }));
        }
    };

    useEffect(() => {
        setQuantity(item.quantity);
    }, [item.quantity, dispatch]);

    return (
        <TableRow>
            <TableCell>
                <Typography>{index}</Typography>
            </TableCell>
            <TableCell>
                <img src={item.image} alt={item.name} width={100} height={100} />
            </TableCell>
            <TableCell>
                <Typography variant="h6">{item.name}</Typography>
            </TableCell>
            <TableCell>
                <Typography variant="body2">{formatCurrency(item.price)}</Typography>
            </TableCell>
            <TableCell>
                <Stack direction="row" alignItems="center" spacing={1}>
                    <IconButton onClick={decrementQuantity} aria-label="decrement">
                        <Icon
                            icon="material-symbols:remove-rounded"
                            style={{
                                color: customTheme.palette.common.white
                            }} />
                    </IconButton>
                    <TextField
                        type="text"
                        inputMode="numeric"
                        value={quantity}
                        onChange={handleQuantityChange}
                        inputProps={{ min: 0, style: { textAlign: "center" } }}
                        size="small"
                        sx={{
                            width: "60px",
                            borderColor: customTheme.palette.common.white
                        }}
                    />
                    <IconButton onClick={incrementQuantity} aria-label="increment">
                        <Icon
                            icon="material-symbols:add-2-rounded"
                            style={{
                                color: customTheme.palette.common.white
                            }} />
                    </IconButton>
                </Stack>
            </TableCell>
            <TableCell>
                <Typography variant="body2">{formatCurrency(totalItemPrice)}</Typography>
            </TableCell>
        </TableRow>
    );
};
