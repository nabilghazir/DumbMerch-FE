import { Paper, TextField, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { useEffect, useState } from 'react';
import { getProfile } from '../../store/profile/asyncThunk';
import customTheme from '../../theme/theme';

export const CheckoutAddress = () => {
    const dispatch = useAppDispatch();
    const profile = useAppSelector((state) => state.profile);
    const [address, setAddress] = useState('');

    useEffect(() => {
        dispatch(getProfile());
    }, [dispatch]);

    useEffect(() => {
        if (profile && profile.profile?.address) {
            setAddress(profile.profile.address);
        }
    }, [profile]);

    const handleAddressChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAddress(event.target.value);
    };

    return (
        <Paper elevation={3}
            sx={{
                padding: "20px",
                width: "100%",
                height: "300px",
                borderRadius: "20px"
            }}>
            <Typography
                variant="h5"
                sx={{
                    fontWeight: "600",
                    marginBottom: "20px"
                }}>
                Billing Address
            </Typography>
            <TextField
                fullWidth
                multiline
                value={address}
                onChange={handleAddressChange}
                variant="outlined"
                sx={{
                    '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                            borderColor: customTheme.palette.common.white
                        },
                        '&:hover fieldset': {
                            borderColor: customTheme.palette.primary.main
                        },
                        '&.Mui-focused fieldset': {
                            borderColor: customTheme.palette.primary.main
                        },
                    },
                    '& .MuiInputBase-root': {
                        height: '200px',
                        alignItems: 'flex-start',
                        textAlign: 'initial',
                    }
                }}
            />
        </Paper>
    );
};
