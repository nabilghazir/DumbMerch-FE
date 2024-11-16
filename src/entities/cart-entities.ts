export interface CartItemEntity {
    id: number;
    productId: number;
    name: string;
    price: number;
    stock: number;
    quantity: number;
    image: string;
}

export interface CartEntity {
    id: number;
    userId: number;
    items: CartItemEntity[];
    totalPrice: number;
}

export interface UserEntity {
    id: number;
    email: string;
    name?: string;
    carts?: CartEntity[];
}

export interface CartProductEntity {
    cartId: number;
    productId: number;
    quantity: number;
}

export interface CartItemProps {
    id: number;
    productId: number;
    name: string;
    price: number;
    quantity: number;
    image: string;
}


export interface OrderEntity {
    id: number;
    userId: number;
    cartId: number;
    shipTo?: string;
    totalAmount: number;
    status: OrderStatus;
    createdAt: Date;
    updatedAt: Date;
}

export interface PaymentEntity {
    id: number;
    orderId: number;
    paymentStatus: PaymentStatus;
    paymentMethod: string;
    createdAt: Date;
    updatedAt: Date;
}

export enum OrderStatus {
    PENDING = 'PENDING',
    INPROGRESS = 'INPROGRESS',
    COMPLETED = 'COMPLETED',
    CANCELED = 'CANCELED',
}

export enum PaymentStatus {
    PENDING = 'PENDING',
    INPROGRESS = 'INPROGRESS',
    COMPLETED = 'COMPLETED',
    CANCELED = 'CANCELED',
}
