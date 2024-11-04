export interface UserEntities {
    id: number;
    email: string;
    role: string;
    profile: ProfileEntities;
}

export interface ProfileEntities {
    id: number;
    name: string;
    gender: string;
    phone: number;
    address: string;
    userId: number;
}
