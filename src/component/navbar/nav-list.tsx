import { Box, Stack, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { jwtDecode } from "jwt-decode";
import { NavComponentAdmin, NavComponentMember, NavComponent } from "./nav-component";
import { NavItem } from "./nav-item";
import { Role } from "./nav-props";
import customTheme from "../../theme/theme";
import { LOGOUT } from "../../store/auth/auth-slice";

interface DecodedToken {
    role: string;
}

export const NavList = () => {
    const authState = useAppSelector((state) => state.auth);
    const dispatch = useAppDispatch();

    let role: string | undefined;
    if (authState.token) {
        const decoded = jwtDecode<DecodedToken>(authState.token);
        role = decoded.role;
    }

    const navItems = role === Role.ADMIN
        ? NavComponentAdmin
        : authState.token
            ? NavComponentMember
            : NavComponent;

    return (
        <Stack
            sx={{
                flexDirection: "row",
                gap: "30px",
            }}
        >
            {navItems.map((item, index) => (
                <NavItem key={index} {...item} />
            ))}
            {authState.token && (
                <Box
                    sx={{
                        color: customTheme.palette.common.white,
                        display: "flex",
                        alignItems: "center",
                        "&:hover": {
                            color: customTheme.palette.primary.main
                        }
                    }}
                >
                    <Typography
                        onClick={() => dispatch(LOGOUT())}
                        sx={{
                            fontSize: "18px",
                            fontWeight: "600",
                            "&:hover": {
                                cursor: "pointer"
                            }
                        }}
                    >
                        Logout
                    </Typography>
                </Box>
            )}
        </Stack>
    );
};
