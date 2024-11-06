import { Button, Paper, styled, Table, TableBody, TableCell, tableCellClasses, TableContainer, TableHead, TableRow } from "@mui/material";
import { useEffect, useState } from "react";
import { getAllProduct, deleteProduct } from "../../../store/product/asyncThunk";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import customTheme from "../../../theme/theme";
import { ProductEntities } from "../../../entities/product-entitities";
import { EditProductModal } from "./product-edit/edit-product-modal";
import { toast } from "react-toastify";

export const AdminProductTable = () => {
    const dispatch = useAppDispatch();
    const productState = useAppSelector((state) => state.product);

    const [selectedProduct, setSelectedProduct] = useState<ProductEntities | null>(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    const handleOpenEditModal = (product: ProductEntities) => {
        setSelectedProduct(product);
        setIsEditModalOpen(true);
    };

    const handleCloseEditModal = () => {
        setIsEditModalOpen(false);
        setSelectedProduct(null);
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
        dispatch(getAllProduct());
    }, [dispatch]);

    const handleDelete = async (productId: number) => {
        const confirmation = window.confirm("Are you sure you want to delete this product?");
        if (confirmation) {
            try {
                await dispatch(deleteProduct(productId)).unwrap();
                toast.success("Product deleted successfully!");
            } catch (error) {
                toast.error("Failed to delete product.");
            }
        }
    };

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(value);
    };

    return (
        <>
            <TableContainer component={Paper} sx={{ width: "100%", height: "100%" }}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>No</StyledTableCell>
                            <StyledTableCell>ID</StyledTableCell>
                            <StyledTableCell>Product Name</StyledTableCell>
                            <StyledTableCell>Category</StyledTableCell>
                            <StyledTableCell>Stock</StyledTableCell>
                            <StyledTableCell>Price</StyledTableCell>
                            <StyledTableCell sx={{ width: "100px" }}></StyledTableCell>
                            <StyledTableCell sx={{ width: "100px" }}></StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {productState.products?.map((product, index) => (
                            <StyledTableRow key={product.id}>
                                <StyledTableCell>{index + 1}</StyledTableCell>
                                <StyledTableCell>{product.id}</StyledTableCell>
                                <StyledTableCell>{product.name}</StyledTableCell>
                                <StyledTableCell>{product.category.name}</StyledTableCell>
                                <StyledTableCell>{product.stock}</StyledTableCell>
                                <StyledTableCell>{formatCurrency(product.price)}</StyledTableCell>
                                <StyledTableCell>
                                    <Button
                                        onClick={() => handleOpenEditModal(product)}
                                        sx={{ backgroundColor: customTheme.palette.success.main, color: customTheme.palette.common.white }}>
                                        Edit
                                    </Button>
                                </StyledTableCell>
                                <StyledTableCell>
                                    <Button
                                        onClick={() => handleDelete(product.id)}
                                        sx={{ backgroundColor: customTheme.palette.error.main, color: customTheme.palette.common.white }}>
                                        Delete
                                    </Button>
                                </StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {selectedProduct && (
                <EditProductModal
                    product={selectedProduct}
                    open={isEditModalOpen}
                    onClose={handleCloseEditModal}
                />
            )}
        </>
    );
};
