import { Stack } from "@mui/material"
import { TransactionTable } from "../../component/admin/admin-transaction/admin-transaction-table"

export const AdminTransactions = () => {
    return (
        <Stack
            sx={{
                width: "100%",
                height: "100%"
            }}>
            <Stack
                sx={{
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: "150px"
                }}>
                <TransactionTable />
            </Stack>
        </Stack>
    )
}
