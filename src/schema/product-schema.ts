import { z } from "zod";

export const productSchema = z.object({
    name: z.string().min(1, "Product name is required"),
    desc: z.string().min(1, "Description is required"),
    stock: z.number().min(1, "Stock must be greater than zero"),
    price: z.number().min(0.01, "Price must be a positive number"),
    categoryId: z.number().min(1, "Category is required"),
    categoryName: z.string().min(1, "Category name is required"),
    productImages: z.array(z.instanceof(File)).min(1, "At least one product image is required"),  // Validate that at least one image is selected
});

export type CreateProductEntities = z.infer<typeof productSchema>