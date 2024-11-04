export interface ProductEntities {
    id: number;
    name: string;
    desc: string;
    stock: number;
    price: number;
    categoryId: number;
    category: Category;
    productImages?: ProductImages[]
}

export interface ProductImages {
    url?: string;
}

export interface Category {
    id: number,
    name: string,
    products: ProductEntities[]
}
