import { Button, Paper, styled, Table, TableBody, TableCell, tableCellClasses, TableContainer, TableHead, TableRow } from "@mui/material"; // Import button for deletion
import { useEffect } from "react";
import { getAllCategory, deleteCategory } from "../../store/category/asyncThunk";
import { useAppDispatch, useAppSelector } from "../../store/store";
import customTheme from "../../theme/theme";

export const AdminCategoryTable = () => {
    const dispatch = useAppDispatch();
    const categoryState = useAppSelector((state) => state.category);

    const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(odd)': {
            backgroundColor: customTheme.palette.action.hover,
        },
        '&:last-child td, &:last-child th': {
            border: 0,
        },
    }));

    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: customTheme.palette.common.black,
            color: customTheme.palette.common.white,
        },
        [`&.${tableCellClasses.body}`]: {
            fontSize: 14,
        },
    }));

    useEffect(() => {
        dispatch(getAllCategory());
    }, [dispatch]);

    const handleDelete = (categoryId: number) => {
        dispatch(deleteCategory(categoryId));
    };

    return (
        <TableContainer
            component={Paper}
            sx={{
                width: "80%",
                height: "100%",
                justifyContent: "center",
                alignItems: "center",
                marginTop: "75px",
            }}>
            <Table sx={{
                minWidth: 700
            }} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell>#</StyledTableCell>
                        <StyledTableCell>ID</StyledTableCell>
                        <StyledTableCell>Category Name</StyledTableCell>
                        <StyledTableCell
                            sx={{
                                width: "100px"
                            }}></StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {categoryState.categories?.map((category, index) => (
                        <StyledTableRow key={category.id}>
                            <StyledTableCell>{index + 1}</StyledTableCell>
                            <StyledTableCell>{category.id}</StyledTableCell>
                            <StyledTableCell>{category.name}</StyledTableCell>
                            <StyledTableCell>
                                <Button
                                    onClick={() => handleDelete(category.id)}
                                    sx={{

                                    }}
                                >
                                    Delete
                                </Button>
                            </StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};
