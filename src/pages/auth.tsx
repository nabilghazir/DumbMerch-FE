import { Box, Stack } from "@mui/material";
import { AuthLeft } from "../layout/auth/auth-left";
import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../store/store";
import { jwtDecode } from "jwt-decode";

interface DecodedToken {
    role: string;
}

export const Auth = () => {
    const authState = useAppSelector((state) => state.auth);
    let role: string | undefined;

    if (authState.token) {
        const decoded = jwtDecode<DecodedToken>(authState.token);
        role = decoded.role;
    }

    if (role === "ADMIN") {
        return <Navigate to="/dashboard" replace />;
    }
    if (role) {
        return <Navigate to="/product" replace />;
    }

    return (
        <Stack
            sx={{
                flexDirection: "row",
                width: "100vw",
                height: "100vh",
            }}
        >
            <Box flex={3}>
                <AuthLeft />
            </Box>
            <Box flex={2}>
                <Outlet />
            </Box>
        </Stack>
    );
};
