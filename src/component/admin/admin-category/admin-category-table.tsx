import { Button, Paper, styled, Table, TableBody, TableCell, tableCellClasses, TableContainer, TableHead, TableRow } from "@mui/material";
import { useEffect, useState } from "react";
import { getAllCategory, deleteCategory } from "../../../store/category/asyncThunk";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import customTheme from "../../../theme/theme";
import { CategoriesEntities } from "../../../entities/categories-entities";
import { EditCategoryModal } from "./admin-edit-categories/admin-edit-categories-modal";

export const AdminCategoryTable = () => {
    const dispatch = useAppDispatch();
    const categoryState = useAppSelector((state) => state.category);

    const [selectedCategory, setSelectedCategory] = useState<CategoriesEntities | null>(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    const handleOpenEditModal = (category: CategoriesEntities) => {
        setSelectedCategory(category);
        setIsEditModalOpen(true);
    };

    const handleCloseEditModal = () => {
        setIsEditModalOpen(false);
        setSelectedCategory(null);
    };

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

    useEffect(() => {
        dispatch(getAllCategory());
    }, [dispatch]);

    const handleDelete = (categoryId: number) => {
        dispatch(deleteCategory(categoryId));
    };

    return (
        <>
            <TableContainer
                component={Paper}
                sx={{
                    width: "100%",
                    height: "100%",
                    justifyContent: "center",
                    alignItems: "center",
                }}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>No</StyledTableCell>
                            <StyledTableCell>ID</StyledTableCell>
                            <StyledTableCell>Category Name</StyledTableCell>
                            <StyledTableCell sx={{ width: "100px" }}></StyledTableCell>
                            <StyledTableCell sx={{ width: "100px" }}></StyledTableCell>
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
                                        onClick={() => handleOpenEditModal(category)}
                                        sx={{
                                            backgroundColor: customTheme.palette.success.main,
                                            color: customTheme.palette.common.white,
                                        }}
                                    >
                                        Edit
                                    </Button>
                                </StyledTableCell>
                                <StyledTableCell>
                                    <Button
                                        onClick={() => handleDelete(category.id)}
                                        sx={{
                                            backgroundColor: customTheme.palette.error.main,
                                            color: customTheme.palette.common.white,
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

            {selectedCategory && (
                <EditCategoryModal
                    category={selectedCategory}
                    open={isEditModalOpen}
                    onClose={handleCloseEditModal}
                />
            )}
        </>
    );
};
