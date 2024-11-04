import { Stack } from "@mui/material"
import { AdminCategoryTable } from "../../component/admin/admin-category-table"


export const AdminCategory = () => {


    return (
        <Stack
            sx={{
                width: "100%",
                height: "100%",
                marginLeft: "160px",
                marginTop: "75px",
            }}>
            <Stack>
                <AdminCategoryTable />
            </Stack>
        </Stack>
    )
}
