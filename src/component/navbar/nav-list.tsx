import { Badge, Box, Stack, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { jwtDecode } from "jwt-decode";
import { NavComponentAdmin, NavComponentMember, NavComponent } from "./nav-component";
import { NavItem } from "./nav-item";
import { Role } from "./nav-props";
import customTheme from "../../theme/theme";
import { LOGOUT } from "../../store/auth/auth-slice";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchCart } from "../../store/cart/asyncThunk";

interface DecodedToken {
    role: string;
}

export const NavList = () => {
    const authState = useAppSelector((state) => state.auth);
    const cartState = useAppSelector((state) => state.cart.cart);
    const dispatch = useAppDispatch();
    const [isHovered, setIsHovered] = useState(false);

    let role: string | undefined;
    if (authState.token) {
        const decoded = jwtDecode<DecodedToken>(authState.token);
        role = decoded.role;
    }

    const totalQuantity = cartState?.items.reduce((total, item) => total + item.quantity, 0) || 0;

    const navItems = role === Role.ADMIN
        ? NavComponentAdmin
        : authState.token
            ? NavComponentMember
            : NavComponent;

    useEffect(() => {
        if (authState.user?.id) {
            dispatch(fetchCart(authState.user?.id));
        }
    }, [authState.user?.id, dispatch]);
    return (
        <Stack
            sx={{
                flexDirection: "row",
                gap: "30px",
            }}
        >
            {role === Role.MEMBER && (
                <Link to="/cart"
                    style={{
                        textDecoration: "none",
                        color: customTheme.palette.common.white,
                    }}>
                    <Badge
                        badgeContent={totalQuantity}
                        color="primary"
                        sx={{
                            "& .MuiBadge-badge": {
                                backgroundColor: customTheme.palette.primary.main,
                                color: "white"
                            }
                        }}
                    >
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                cursor: "pointer",
                            }}
                            onMouseEnter={() => setIsHovered(true)}
                            onMouseLeave={() => setIsHovered(false)}
                        >
                            <Icon
                                icon="material-symbols:shopping-cart-outline-rounded"
                                width={30}
                                height={30}
                                style={{
                                    color: isHovered ? customTheme.palette.primary.main : customTheme.palette.common.white,
                                }}
                            />
                        </Box>
                    </Badge>
                </Link>
            )}
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
