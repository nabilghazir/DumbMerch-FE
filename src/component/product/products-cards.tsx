import React from 'react';
import { Link } from 'react-router-dom';
import { ProductEntities } from '../../entities/product-entitities';
import { Box, Paper, Typography, Button } from '@mui/material';
import customTheme from '../../theme/theme';
import { addProductToCart } from '../../store/cart/asyncThunk';
import { AddProductToCartDTO } from '../../entities/cart-dto';
import { useAppDispatch } from '../../store/store';


export const ProductCards: React.FC<ProductEntities> = ({ id, name, price, stock, productImages }) => {
    const dispatch = useAppDispatch();

    const imageUrl = productImages && productImages.length > 0 ? productImages[0].url : 'placeholder.jpg';

    const idr = Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
    }).format(price);

    const handleAddToCart = () => {
        const productData: AddProductToCartDTO = {
            productId: id,
            quantity: 1,
        };
        dispatch(addProductToCart(productData));
    };

    return (
        <Paper
            sx={{
                padding: "10px",
                width: "200px",
                height: "275px",
                boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.75)",
                textDecoration: "none",
                "&:hover": {
                    color: customTheme.palette.primary.main
                }
            }}
        >
            <Link
                to={`/product-detail/${id}`}
                style={{
                    textDecoration: "none",
                    color: "inherit"
                }}
            >
                <Box
                    sx={{
                        width: "100%",
                        height: "125px",
                    }}
                >
                    <img
                        src={imageUrl}
                        width={"100%"}
                        height={"125px"}
                        style={{ objectFit: "contain" }}
                    />
                </Box>
                <Typography
                    sx={{
                        fontSize: "20px",
                        fontWeight: "bold",
                    }}
                >
                    {name}
                </Typography>
                <Typography>
                    {stock} Left
                </Typography>
                <Typography>
                    {idr}
                </Typography>
            </Link>
            <Button
                variant="contained"
                color="primary"
                onClick={handleAddToCart}
                sx={{ marginTop: "10px" }}
            >
                + Add to Cart
            </Button>
        </Paper>
    );
};
