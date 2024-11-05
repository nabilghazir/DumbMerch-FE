import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Button, TextField, FormControl, CircularProgress, Input, Typography } from '@mui/material';
import { zodResolver } from '@hookform/resolvers/zod';
import { productSchema, CreateProductEntities } from '../../../../schema/product-schema';
import { createProduct } from '../../../../store/product/asyncThunk';
import { useAppDispatch, useAppSelector } from '../../../../store/store';

interface CreateProductFormProps {
    handleClose: () => void;
}

export const CreateProductForm: React.FC<CreateProductFormProps> = ({ handleClose }) => {
    const dispatch = useAppDispatch();
    const loading = useAppSelector((state) => state.product.loading);
    const { control, handleSubmit, reset } = useForm<CreateProductEntities>({
        resolver: zodResolver(productSchema),
        defaultValues: {
            name: '',
            desc: '',
            stock: 0,
            price: 0,
            categoryId: 1,
            categoryName: '',
            productImages: [],
        },
    });

    const onSubmit = async (data: CreateProductEntities) => {
        await dispatch(createProduct(data));
        handleClose();
        reset();
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl fullWidth margin="normal">
                <Controller
                    name="name"
                    control={control}
                    render={({ field, fieldState }) => (
                        <TextField {...field} label="Product Name" error={!!fieldState.error} helperText={fieldState.error?.message} />
                    )}
                />
            </FormControl>

            <FormControl fullWidth margin="normal">
                <Controller
                    name="desc"
                    control={control}
                    render={({ field, fieldState }) => (
                        <TextField {...field} label="Description" multiline rows={3} error={!!fieldState.error} helperText={fieldState.error?.message} />
                    )}
                />
            </FormControl>

            <FormControl fullWidth margin="normal">
                <Controller
                    name="stock"
                    control={control}
                    render={({ field, fieldState }) => (
                        <TextField {...field} label="Stock" type="number" error={!!fieldState.error} helperText={fieldState.error?.message} />
                    )}
                />
            </FormControl>

            <FormControl fullWidth margin="normal">
                <Controller
                    name="price"
                    control={control}
                    render={({ field, fieldState }) => (
                        <TextField {...field} label="Price" type="number" error={!!fieldState.error} helperText={fieldState.error?.message} />
                    )}
                />
            </FormControl>


            <FormControl fullWidth margin="normal">
                <Controller
                    name="categoryName"
                    control={control}
                    render={({ field, fieldState }) => (
                        <TextField {...field} label="Category Name" error={!!fieldState.error} helperText={fieldState.error?.message} />
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
                                onChange={(e) => field.onChange((e.target as HTMLInputElement).files)}
                                fullWidth
                            />
                        </>
                    )}
                />
            </FormControl>


            <Button type="submit" variant="contained" color="primary" fullWidth disabled={loading}>
                {loading ? <CircularProgress size={24} /> : "Create Product"}
            </Button>
        </form>
    );
};
