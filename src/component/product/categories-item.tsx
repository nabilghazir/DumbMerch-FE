
import React from "react"
import { NavLink } from "react-router-dom"
import { CategoriesEntities } from "../../entities/categories-entities"
import { Box, Typography } from "@mui/material"
import customTheme from "../../theme/theme"

export const CategoriesItem: React.FC<CategoriesEntities> = ({ name }) => {
    return (
        <NavLink to={`/product/${name}`}
            style={{
                textDecoration: "none",
                width: "100%",
                height: "100px",
            }}>
            {({ isActive }) => (
                <Box
                    className={`nav - list ${isActive ? "active" : ""} `}
                    sx={{
                        color: isActive ? customTheme.palette.primary.main : customTheme.palette.text.primary,
                        bgcolor: isActive ? customTheme.palette.grey[900] : "transparent",
                        display: "flex",
                        borderRadius: "10px 0 0 0",
                        justifyContent: "center",
                        height: "100%",
                        alignItems: "center",
                        "&:hover": {
                            color: customTheme.palette.primary.main,
                            bgcolor: customTheme.palette.grey[900]
                        }
                    }}>
                    <Typography
                        sx={{
                            fontSize: "20px",
                            fontWeight: "600",
                        }}>
                        {name}
                    </Typography>
                </Box>
            )}
        </NavLink>
    )
}
