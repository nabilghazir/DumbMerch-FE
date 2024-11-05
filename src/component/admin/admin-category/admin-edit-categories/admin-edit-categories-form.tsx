import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Button, TextField, FormControl, CircularProgress } from '@mui/material';
import { zodResolver } from '@hookform/resolvers/zod';
import { CategoriesEntities } from '../../../../entities/categories-entities';
import { CategoryFormData, categorySchema } from '../../../../schema/category-schema';
import { updateCategory } from '../../../../store/category/asyncThunk';
import { useAppDispatch, useAppSelector } from '../../../../store/store';


interface EditCategoryFormProps {
    category: CategoriesEntities;
    handleClose: () => void;
}

export const EditCategoryForm: React.FC<EditCategoryFormProps> = ({ category, handleClose }) => {
    const dispatch = useAppDispatch();
    const loading = useAppSelector((state) => state.category.loading);
    const { control, handleSubmit } = useForm<CategoryFormData>({
        resolver: zodResolver(categorySchema),
        defaultValues: { name: category.name }
    });

    const onSubmit = async (data: CategoryFormData) => {
        await dispatch(updateCategory({ data, categoryId: category.id }));
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
                {loading ? <CircularProgress size={24} /> : "Save Changes"}
            </Button>
        </form>
    );
};
