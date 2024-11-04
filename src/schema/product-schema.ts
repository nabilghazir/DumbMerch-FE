import { z } from 'zod';

export const productSchema = z.object({
    name: z.string().min(1, "Name is required"),
    desc: z.string().min(1, "Description is required"),
    stock: z.number().int().min(0, "Stock must be a non-negative integer"),
    price: z.number().positive("Price must be a positive number"),
    categoryId: z.number().int().positive("Category ID must be a positive integer"),
    categoryName: z.string().min(1, "Category name is required"),
    productImages: z.array(z.instanceof(File)).min(1, "At least one image is required"),
});

export type CreateProductEntities = z.infer<typeof productSchema>