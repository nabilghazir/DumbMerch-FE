import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Button, TextField, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import { useAppSelector } from '../../store/store';
import { api } from '../../libs/api';

interface ProfileFormData {
    name: string;
    phone: string;
    gender: string;
    address: string;
    avatar: File | null;
}

interface ProfileEditFormProps {
    handleClose: () => void;
}

export const ProfileEditForm: React.FC<ProfileEditFormProps> = ({ handleClose }) => {
    const profileState = useAppSelector((state) => state.profile);

    const { control, handleSubmit, setValue } = useForm<ProfileFormData>({
        defaultValues: {
            name: profileState.profile?.name || "",
            phone: profileState.profile?.phone || "",
            gender: profileState.profile?.gender || "",
            address: profileState.profile?.address || "",
            avatar: null,
        }
    });
    const [avatar, setAvatar] = useState<File | null>(null);

    const onSubmit = async (data: ProfileFormData) => {
        try {
            const formData = new FormData();
            formData.append("name", data.name);
            formData.append("phone", data.phone);
            formData.append("gender", data.gender);
            formData.append("address", data.address);
            if (avatar) formData.append("avatar", avatar);

            const response = await api.put("/profile/update", formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            console.log('Profile updated successfully', response.data);

            // Close the modal on successful update
            handleClose();
        } catch (error) {
            console.error('Failed to update profile', error);
        }
    };

    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setAvatar(file);
            setValue("avatar", file);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl fullWidth margin="normal">
                <FormLabel>Avatar</FormLabel>
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarChange}
                />
            </FormControl>

            <Controller
                name="name"
                control={control}
                defaultValue=""
                render={({ field }) => (
                    <TextField {...field} label="Name" fullWidth margin="normal" />
                )}
            />

            <Controller
                name="phone"
                control={control}
                defaultValue=""
                render={({ field }) => (
                    <TextField {...field} label="Phone" fullWidth margin="normal" />
                )}
            />

            <FormControl component="fieldset" fullWidth margin="normal">
                <FormLabel>Gender</FormLabel>
                <Controller
                    name="gender"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                        <RadioGroup {...field} row>
                            <FormControlLabel value="MALE" control={<Radio />} label="Male" />
                            <FormControlLabel value="FEMALE" control={<Radio />} label="Female" />
                        </RadioGroup>
                    )}
                />
            </FormControl>

            <Controller
                name="address"
                control={control}
                defaultValue=""
                render={({ field }) => (
                    <TextField {...field} label="Address" fullWidth margin="normal" />
                )}
            />

            <Button type="submit" variant="contained" color="primary" fullWidth>
                Save Changes
            </Button>
        </form>
    );
};
