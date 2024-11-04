import React from 'react'
import { Link } from 'react-router-dom'
import { ProductEntities } from '../../entities/product-entitities'
import { Box, Paper, Typography } from '@mui/material'
import customTheme from '../../theme/theme'

export const ProductCards: React.FC<ProductEntities> = ({ name, price, stock, productImages, id }) => {

    const imageUrl = productImages && productImages.length > 0 ? productImages[0].url : 'placeholder.jpg';

    const idr = Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
    }).format(price)

    return (
        <Link
            to={`/product-detail/${id}`}
            style={{ textDecoration: "none" }}>
            <Paper
                sx={{
                    padding: "10px",
                    width: "200px",
                    height: "225px",
                    boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.75)",
                    "&:hover": {
                        color: customTheme.palette.primary.main
                    }
                }}>
                <Box
                    sx={{
                        width: "100%",
                        height: "125px",
                    }}>
                    <img
                        src={imageUrl}
                        width={"100%"}
                        height={"125px"}
                        style={{ objectFit: "contain" }} />
                </Box>
                <Typography
                    sx={{
                        fontSize: "20px",
                        fontWeight: "bold",
                    }}>
                    {name}
                </Typography>
                <Typography>
                    {stock} Left
                </Typography>
                <Typography>
                    {idr}
                </Typography>
            </Paper>
        </Link>
    )
}
