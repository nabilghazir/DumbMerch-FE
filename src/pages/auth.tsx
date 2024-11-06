import { Box, Stack } from "@mui/material";
import { AuthLeft } from "../layout/auth/auth-left";
import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../store/store";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";

interface DecodedToken {
    role: string;
}

export const Auth: React.FC = () => {
    const authState = useAppSelector((state) => state.auth);
    const [role, setRole] = useState<string | undefined>(undefined);

    useEffect(() => {
        if (authState.token) {
            try {
                const decoded = jwtDecode<DecodedToken>(authState.token);
                setRole(decoded.role);
            } catch (error) {
                console.error("Token decoding failed:", error);
                setRole(undefined);
            }
        } else {
            setRole(undefined); // Clear role if no token
        }
    }, [authState.token]);

    console.log("Current authState.token:", authState.token);

    if (role === "ADMIN") {
        return <Navigate to="/dashboard" replace />;
    }
    if (role === "MEMBER") {
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
