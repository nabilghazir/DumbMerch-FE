export interface ProductDTO {
    id: number;
    name: string;
    price: number;
    description?: string;
    productImages?: ProductImages[];
}

export interface ProductImages {
    url?: string;
}

export interface CartItemDTO {
    id: number;
    quantity: number;
    product: ProductDTO;
}

export interface CartDTO {
    id: number;
    cartItems: CartItemDTO[];
    totalAmount: number;
}

export interface PaymentDTO {
    id: number;
    paymentMethod: string;
    paymentUrl: string;
    paymentStatus: PaymentStatus;
}

export interface TransactionDTO {
    id: number;
    userId: number;
    cartId: number;
    cart: CartDTO;
    shipTo?: string | null;
    totalAmount: number;
    status: TransactionStatus;
    payment?: PaymentDTO;
}

export interface CreateTransactionDTO {
    shipTo?: string | null;
}


enum TransactionStatus {
    PENDING = "PENDING",
    INPROGRESS = "INPROGRESS",
    COMPLETED = "COMPLETED",
    CANCELED = "CANCELED"
}

enum PaymentStatus {
    PENDING = 'PENDING',
    INPROGRESS = 'INPROGRESS',
    COMPLETED = 'COMPLETED',
    CANCELED = 'CANCELED',
}
