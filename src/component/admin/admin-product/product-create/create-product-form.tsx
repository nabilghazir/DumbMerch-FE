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
    const { control, handleSubmit, reset, formState: { errors } } = useForm<CreateProductEntities>({
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
        console.log("Form data before submission:", data);

        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('desc', data.desc);
        formData.append('stock', data.stock.toString());
        formData.append('price', data.price.toString());
        formData.append('categoryId', data.categoryId.toString());
        formData.append('categoryName', data.categoryName);

        if (data.productImages && data.productImages.length > 0) {
            data.productImages.forEach((file) => {
                formData.append('productImages', file);
            });
        }

        try {
            const response = await dispatch(createProduct(formData));
            console.log("Response from dispatch:", response);
            handleClose();
            reset();
            const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
            fileInput.value = "";
        } catch (error) {
            console.error("Error during form submission:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl fullWidth margin="normal">
                <Controller
                    name="name"
                    control={control}
                    render={({ field }) => (
                        <TextField {...field} label="Product Name" error={!!errors.name} helperText={errors.name?.message} />
                    )}
                />
            </FormControl>

            <FormControl fullWidth margin="normal">
                <Controller
                    name="desc"
                    control={control}
                    render={({ field }) => (
                        <TextField {...field} label="Description" multiline rows={3} error={!!errors.desc} helperText={errors.desc?.message} />
                    )}
                />
            </FormControl>

            <FormControl fullWidth margin="normal">
                <Controller
                    name="stock"
                    control={control}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            label="Stock"
                            type="number"
                            onChange={(e) => field.onChange(e.target.value ? parseInt(e.target.value, 10) : 0)}
                            error={!!errors.stock}
                            helperText={errors.stock?.message}
                        />
                    )}
                />
            </FormControl>

            <FormControl fullWidth margin="normal">
                <Controller
                    name="price"
                    control={control}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            label="Price"
                            type="number"
                            onChange={(e) => field.onChange(e.target.value ? parseFloat(e.target.value) : 0)}
                            error={!!errors.price}
                            helperText={errors.price?.message}
                        />
                    )}
                />
            </FormControl>

            <FormControl fullWidth margin="normal">
                <Controller
                    name="categoryName"
                    control={control}
                    render={({ field }) => (
                        <TextField {...field} label="Category Name" error={!!errors.categoryName} helperText={errors.categoryName?.message} />
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
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                    const files = e.target.files;
                                    if (files) {
                                        field.onChange(Array.from(files)); // Convert FileList to Array
                                    }
                                }}
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
