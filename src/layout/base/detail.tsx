import { Paper, Stack, Button, Box, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import { ProductEntities } from '../../entities/product-entitities';
import { useEffect, useState } from 'react';
import { Icon } from "@iconify/react";
import { api } from '../../libs/api';
import customTheme from '../../theme/theme';

export const Detail = () => {
    const { productName } = useParams();
    const [details, setDetails] = useState<ProductEntities>();
    const [imageIndex, setImageIndex] = useState(0);

    const getDetail = async () => {
        try {
            const res = await api.get(`/product/get/${productName}`);
            setDetails(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getDetail();
    }, []);

    const handleNextImage = () => {
        if (details?.productImages && details.productImages.length > 0) {
            setImageIndex((prevIndex) => (prevIndex + 1) % details.productImages.length);
        }
    };

    const handlePreviousImage = () => {
        if (details?.productImages && details.productImages.length > 0) {
            setImageIndex((prevIndex) =>
                prevIndex === 0 ? details.productImages.length - 1 : prevIndex - 1
            );
        }
    };

    const { name, desc, stock, price, productImages } = details || {};

    const idr = price
        ? Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(price)
        : "Price not available";

    return (
        <Stack
            sx={{
                justifyContent: "center",
                alignItems: "center",
                marginTop: "80px",
            }}
        >
            <Paper
                sx={{
                    width: "90%",
                    height: "630px",
                    padding: "20px",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                <Stack
                    direction="row"
                    flex={1}
                    sx={{
                        alignItems: "center",
                        justifyContent: "space-between",
                    }}
                >
                    <Button onClick={handlePreviousImage}>
                        <Icon
                            icon={"mdi:arrow-left-bold"}
                            style={{ fontSize: "40px" }}
                        />
                    </Button>
                    <img
                        src={productImages?.[imageIndex]?.url || 'placeholder.jpg'}
                        alt={name || 'Product Image'}
                        style={{
                            width: '500px',
                            height: '500px',
                            objectFit: 'contain'
                        }}
                    />
                    <Button onClick={handleNextImage}>
                        <Icon
                            icon={"mdi:arrow-right-bold"}
                            style={{ fontSize: "40px" }}
                        />
                    </Button>
                </Stack>
                <Box
                    flex={1}
                    sx={{
                        paddingX: "20px"
                    }}
                >
                    <Typography
                        variant="h1"
                        sx={{
                            color: customTheme.palette.primary.main,
                            fontSize: "75px",
                            fontWeight: "bold"
                        }}
                    >
                        {name}
                    </Typography>
                    <Typography variant="h6">Stock: {stock}</Typography>
                    <Typography
                        variant="h6"
                        sx={{
                            fontSize: "20px",
                        }}
                    >
                        {desc}
                    </Typography>
                    <Typography
                        variant="h6"
                        sx={{
                            textAlign: "end",
                            fontWeight: "bold",
                            color: customTheme.palette.primary.main,
                            marginTop: "20px"
                        }}>
                        {idr}
                    </Typography>
                    <Button
                        sx={{
                            width: "100%",
                            marginTop: "30px",
                            backgroundColor: customTheme.palette.primary.main,
                            color: customTheme.palette.common.white,
                            fontWeight: "bold"
                        }}>
                        Buy
                    </Button>
                </Box>
            </Paper>
        </Stack>
    );
};
