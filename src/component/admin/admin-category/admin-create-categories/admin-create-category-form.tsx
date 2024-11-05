import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Button, TextField, FormControl, CircularProgress } from '@mui/material';
import { zodResolver } from '@hookform/resolvers/zod';
import { CategoryFormData, categorySchema } from '../../../../schema/category-schema';
import { createCategory } from '../../../../store/category/asyncThunk';
import { useAppDispatch, useAppSelector } from '../../../../store/store';

interface CreateCategoryFormProps {
    handleClose: () => void;
}

export const CreateCategoryForm: React.FC<CreateCategoryFormProps> = ({ handleClose }) => {
    const dispatch = useAppDispatch();
    const loading = useAppSelector((state) => state.category.loading);
    const { control, handleSubmit, reset } = useForm<CategoryFormData>({
        resolver: zodResolver(categorySchema),
        defaultValues: { name: "" }
    });

    const onSubmit = async (data: CategoryFormData) => {
        await dispatch(createCategory(data));
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

            <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                disabled={loading}
            >
                {loading ? <CircularProgress size={24} /> : "Create Category"}
            </Button>
        </form>
    );
};
