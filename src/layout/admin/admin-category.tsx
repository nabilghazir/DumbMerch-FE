import { Stack, Typography } from "@mui/material"
import { AdminCategoryTable } from "../../component/admin/admin-category/admin-category-table"
import { CreateCategoryModal } from "../../component/admin/admin-category/admin-create-categories/admin-create-category"


export const AdminCategory = () => {


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
                    padding: "20px"
                }}>
                <Typography
                    variant="h3">
                    Category
                </Typography>
                <CreateCategoryModal />
            </Stack>
            <Stack>
                <AdminCategoryTable />
            </Stack>
        </Stack>
    )
}
