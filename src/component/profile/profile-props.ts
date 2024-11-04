export interface ProfileData {
    email?: string;
    name?: string;
    phone?: string;
    gender?: string;
    address?: string;
}

export interface ProfileBodyProps {
    profileData: ProfileData;
}
