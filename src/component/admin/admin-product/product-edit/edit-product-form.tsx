import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Button, TextField, FormControl, CircularProgress, Input, Typography } from '@mui/material';
import { zodResolver } from '@hookform/resolvers/zod';
import { productSchema, CreateProductEntities } from '../../../../schema/product-schema';
import { updateProduct } from '../../../../store/product/asyncThunk';
import { useAppDispatch, useAppSelector } from '../../../../store/store';

interface EditProductFormProps {
    product: {
        id: number;
        name: string;
        desc: string;
        stock: number;
        price: number;
        categoryId: number;
        category: {
            id: number;
            name: string;
        };
        productImages?: { url?: string }[];
    };
    handleClose: () => void;
}

export const EditProductForm: React.FC<EditProductFormProps> = ({ product, handleClose }) => {
    const dispatch = useAppDispatch();
    const loading = useAppSelector((state) => state.product.loading);
    const { control, handleSubmit } = useForm<CreateProductEntities>({
        resolver: zodResolver(productSchema),
        defaultValues: {
            name: product.name,
            desc: product.desc,
            stock: product.stock,
            price: product.price,
            categoryId: product.categoryId,
            categoryName: product.category.name,
            productImages: []
        }
    });

    const onSubmit = async (data: CreateProductEntities) => {
        await dispatch(updateProduct({ id: product.id, data }));
        handleClose();
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl fullWidth margin="normal">
                <Controller
                    name="name"
                    control={control}
                    render={({ field, fieldState }) => (
                        <TextField
                            {...field}
                            label="Product Name"
                            fullWidth
                            margin="normal"
                            error={!!fieldState.error}
                            helperText={fieldState.error?.message}
                        />
                    )}
                />
            </FormControl>

            <FormControl fullWidth margin="normal">
                <Controller
                    name="desc"
                    control={control}
                    render={({ field, fieldState }) => (
                        <TextField
                            {...field}
                            label="Description"
                            multiline
                            rows={3}
                            fullWidth
                            margin="normal"
                            error={!!fieldState.error}
                            helperText={fieldState.error?.message}
                        />
                    )}
                />
            </FormControl>

            <FormControl fullWidth margin="normal">
                <Controller
                    name="stock"
                    control={control}
                    render={({ field, fieldState }) => (
                        <TextField
                            {...field}
                            label="Stock"
                            type="number"
                            fullWidth
                            margin="normal"
                            error={!!fieldState.error}
                            helperText={fieldState.error?.message}
                        />
                    )}
                />
            </FormControl>

            <FormControl fullWidth margin="normal">
                <Controller
                    name="price"
                    control={control}
                    render={({ field, fieldState }) => (
                        <TextField
                            {...field}
                            label="Price"
                            type="number"
                            fullWidth
                            margin="normal"
                            error={!!fieldState.error}
                            helperText={fieldState.error?.message}
                        />
                    )}
                />
            </FormControl>

            <FormControl fullWidth margin="normal">
                <Controller
                    name="categoryName"
                    control={control}
                    render={({ field, fieldState }) => (
                        <TextField
                            {...field}
                            label="Category Name"
                            fullWidth
                            margin="normal"
                            error={!!fieldState.error}
                            helperText={fieldState.error?.message}
                        />
                    )}
                />
            </FormControl>

            <FormControl fullWidth margin="normal">
                <Controller
                    name="productImages"
                    control={control}
                    render={({ field }) => (
                        <>
                            <Typography variant="body1" margin="normal">
                                Product Images
                            </Typography>
                            <Input
                                type="file"
                                inputProps={{ multiple: true }}
                                onChange={(e) => {
                                    const files = (e.target as HTMLInputElement).files;
                                    if (files) {
                                        field.onChange(Array.from(files));
                                    }
                                }}
                                fullWidth
                            />
                        </>
                    )}
                />
            </FormControl>

            <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                disabled={loading}
            >
                {loading ? <CircularProgress size={24} /> : "Save Changes"}
            </Button>
        </form>
    );
};
