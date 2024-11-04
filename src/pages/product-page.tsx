import { Navigate, Outlet } from "react-router-dom"
import { Stack } from "@mui/material"
import { Navbar } from "../layout/navbar/navbar"
import { useAppSelector } from "../store/store"
import { jwtDecode } from "jwt-decode";

interface DecodedToken {
    role: string;
}
export const ProductPage = () => {
    const authState = useAppSelector((state) => state.auth);
    let role: string | undefined;

    if (!authState.token) {
        return <Navigate to="/login" replace />;
    }

    if (authState.token) {
        const decoded = jwtDecode<DecodedToken>(authState.token);
        role = decoded.role;
    }

    if (role === "ADMIN") {
        return <Navigate to="/dashboard" replace />;
    }

    return (
        <Stack>
            <Navbar />
            <Outlet />
        </Stack>
    )
}
