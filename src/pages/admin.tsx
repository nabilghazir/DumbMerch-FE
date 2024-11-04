import { Box, Stack } from '@mui/material'
import { jwtDecode } from 'jwt-decode';
import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '../store/store';
import { Navbar } from '../layout/navbar/navbar';

interface DecodedToken {
    role: string;
}
export const Admin = () => {
    const authState = useAppSelector((state) => state.auth);
    let role: string | undefined;

    if (!authState.token) {
        return <Navigate to="/login" replace />;
    }

    if (authState.token) {
        const decoded = jwtDecode<DecodedToken>(authState.token);
        role = decoded.role;
    }

    if (role === "MEMBER") {
        return <Navigate to="/product" replace />;
    }


    return (
        <Stack>
            <Box>
                <Navbar />
            </Box>
            <Box
                sx={{
                    width: "100%",
                }}>
                <Outlet />
            </Box>
        </Stack>
    )
}
