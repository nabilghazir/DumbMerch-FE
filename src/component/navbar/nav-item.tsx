import { NavLink } from "react-router-dom"
import { NavProps } from "./nav-props"
import { Box, Typography } from "@mui/material"
import customTheme from "../../theme/theme"

export const NavItem: React.FC<NavProps> = ({ name, path }) => {
    return (
        <NavLink to={path} style={{ textDecoration: "none" }}>
            {({ isActive }) => (
                <Box
                    className={`nav-list ${isActive ? "active" : ""}`}
                    sx={{
                        color: isActive ? customTheme.palette.primary.main : customTheme.palette.text.primary,
                        display: "flex",
                        alignItems: "center",
                        "&:hover": {
                            color: customTheme.palette.primary.main
                        }
                    }}
                >
                    <Typography
                        sx={{
                            fontSize: "18px",
                            fontWeight: "600"
                        }}>
                        {name}
                    </Typography>
                </Box>
            )}
        </NavLink>
    )
}
