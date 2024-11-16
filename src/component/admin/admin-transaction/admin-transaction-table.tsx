import { Paper, Stack, styled, Table, TableBody, TableCell, tableCellClasses, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { api } from "../../../libs/api";
import { TransactionDTO } from "../../../entities/transaction-entities";
import customTheme from "../../../theme/theme";

export const TransactionTable = () => {
    const [fetchTransactions, setFetchTransactions] = useState<TransactionDTO[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const StyledTableRow = styled(TableRow)(({ }) => ({
        '&:nth-of-type(odd)': {
            backgroundColor: customTheme.palette.action.hover,
        },
        '&:last-child td, &:last-child th': {
            border: 0,
        },
    }));

    const StyledTableCell = styled(TableCell)(({ }) => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: customTheme.palette.common.black,
            color: customTheme.palette.common.white,
        },
        [`&.${tableCellClasses.body}`]: {
            fontSize: 14,
        },
    }));

    // Fetch transactions from API
    const getTransactions = async () => {
        setLoading(true);
        try {
            const res = await api.get("/transaction/get-all");
            console.log("Transaction Data : ", res.data);

            setFetchTransactions(res.data); // Assuming res.data is an array of transactions
            setLoading(false);
        } catch (error) {
            setError("Failed to fetch transactions");
            setLoading(false);
            console.error(error);
        }
    };

    // Fetch data once when the component mounts
    useEffect(() => {
        getTransactions();
    }, []); // Empty dependency array ensures the effect runs only once

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(value);
    };

    return (
        <Stack
            sx={{
                justifyContent: "center",
                alignItems: "center",
                width: "80%",
                height: "100%",
            }}>
            <Typography
                variant="h3"
                sx={{
                    textAlign: "start",
                    width: "100%",
                    marginBottom: "20px",

                }}>
                Transaction
            </Typography>
            <TableContainer component={Paper} sx={{ width: "100%", height: "100%" }}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>No</StyledTableCell>
                            <StyledTableCell>ID</StyledTableCell>
                            <StyledTableCell>User ID</StyledTableCell>
                            <StyledTableCell>Total Amount</StyledTableCell>
                            <StyledTableCell>Status</StyledTableCell>
                            <StyledTableCell>Payment Status</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {loading ? (
                            <StyledTableRow>
                                <StyledTableCell colSpan={6} align="center">
                                    Loading...
                                </StyledTableCell>
                            </StyledTableRow>
                        ) : error ? (
                            <StyledTableRow>
                                <StyledTableCell colSpan={6} align="center" color="error">
                                    {error}
                                </StyledTableCell>
                            </StyledTableRow>
                        ) : fetchTransactions.length === 0 ? (
                            <StyledTableRow>
                                <StyledTableCell colSpan={6} align="center">
                                    No transactions available
                                </StyledTableCell>
                            </StyledTableRow>
                        ) : (
                            fetchTransactions.map((transaction, index) => (
                                <StyledTableRow key={transaction.id}>
                                    <StyledTableCell>{index + 1}</StyledTableCell>
                                    <StyledTableCell>{transaction.id}</StyledTableCell>
                                    <StyledTableCell>{transaction.userId}</StyledTableCell>
                                    <StyledTableCell>{formatCurrency(transaction.totalAmount)}</StyledTableCell>
                                    <StyledTableCell>{transaction.status}</StyledTableCell>
                                    <StyledTableCell>{transaction.payment?.paymentStatus || "Not Paid"}</StyledTableCell>
                                </StyledTableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </Stack>
    );
};
