// src/types/dto/cart-dto.ts

// DTO for creating a cart
export interface CreateCartDTO {
    userId: number; // The ID of the user for whom the cart is being created
}

// DTO for adding a product to the cart
export interface AddProductToCartDTO {
    userId: number; // The ID of the user
    productId: number; // The ID of the product being added
    quantity: number; // The quantity of the product being added
}

// DTO for updating product quantity in the cart
export interface UpdateProductQuantityDTO {
    cartId: number; // The ID of the cart
    productId: number; // The ID of the product to update
    quantity: number; // The new quantity of the product
}

// DTO for cart items
export interface CartItemDTO {
    productId: number; // The ID of the product
    name: string; // The name of the product
    price: number; // The price of the product
    quantity: number; // The quantity of the product in the cart
}

// DTO for the cart details
export interface CartDetailsDTO {
    cartId: number; // The ID of the cart
    userId: number; // The ID of the user who owns the cart
    items: CartItemDTO[]; // An array of items in the cart
    totalPrice: number; // The total price of the cart
}

// DTO for fetching a cart
export interface GetCartDTO {
    userId: number; // The ID of the user whose cart is being fetched
}
