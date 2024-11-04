import { Box, Stack, Typography } from "@mui/material"
import customTheme from "../../theme/theme"
import { Categories } from "../../component/product/categories"
import { Products } from "../../component/product/products"


export const Product = () => {
    return (
        <Stack
            sx={{
                justifyContent: "center",
                alignItems: "center",
            }}>
            <Stack
                sx={{
                    width: "80%"
                }}>

                <Typography
                    variant="h6"
                    sx={{
                        marginTop: "80px",
                        textAlign: "initial",
                        fontSize: "50px"
                    }}>
                    Product
                </Typography>
                <Stack
                    sx={{
                        backgroundColor: customTheme.palette.background.paper,
                        flexDirection: "row",
                        border: "3px solid" + customTheme.palette.grey[800],
                        borderRadius: "10px",
                        padding: "0"
                    }}>
                    <Box
                        flex={1}
                        sx={{
                            height: "530px",
                            width: "100%",
                            borderRight: "1px solid" + customTheme.palette.grey[800],
                            overflowX: "auto",
                        }}>
                        <Categories />
                    </Box>
                    <Box
                        flex={4}
                        sx={{
                            padding: "15px",
                        }}>
                        <Products />
                    </Box>
                </Stack>
            </Stack>
        </Stack>
    )
}
