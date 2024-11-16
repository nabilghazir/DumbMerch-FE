export interface CreateCartDTO {
    userId: number;
}

export interface AddProductToCartDTO {
    productId: number;
    quantity: number;
}


export interface UpdateProductQuantityDTO {
    id: number;
    productId: number;
    quantity: number;
}

export interface CartItemDTO {
    productId: number;
    name: string;
    price: number;
    quantity: number;
}

export interface CartDetailsDTO {
    id: number;
    userId: number;
    items: CartItemDTO[];
    totalPrice: number;
}

export interface GetCartDTO {
    userId: number;
}
