export interface ProfileEntities {
    id: number;
    name: string;
    gender?: Gender;
    phone?: string;
    address?: string;
    avatar?: string;
    userId: number;
}

export enum Gender {
    MALE = "MALE",
    FEMALE = "FEMALE",
}