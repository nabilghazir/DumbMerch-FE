import { UserEntities } from "./user-entities";

export interface ChatEntities {
    id: number;
    message: string;
    createdAt: string;
    senderId: number;
}

export interface ChatRoom {
    id: number;
    user: UserEntities;
    createdAt: string;
    updatedAt: string;
    Chat: ChatEntities[]
}