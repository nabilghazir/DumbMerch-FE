import { Stack, Typography } from "@mui/material";
import { AdminProductTable } from "../../component/admin/admin-product/admin-table";
import { CreateProductModal } from "../../component/admin/admin-product/product-create/create-product-modal";


export const AdminProduct = () => {
    return (
        <Stack
            sx={{
                width: "80%",
                height: "100%",
                marginLeft: "160px",
                marginTop: "150px",
            }}>
            <Stack
                sx={{
                    justifyContent: "space-between",
                    alignItems: "center",
                    flexDirection: "row",
                    width: "100%",
                    padding: "20px",
                }}>
                <Typography variant="h3">
                    Products
                </Typography>
                <CreateProductModal />
            </Stack>
            <Stack>
                <AdminProductTable />
            </Stack>
        </Stack>
    );
};
