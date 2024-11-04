import { Box, Paper, Typography } from "@mui/material"
import customTheme from "../../theme/theme"
import { LoginForm } from "../../component/auth/login-form"

export const Login = () => {
    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
                paddingRight: "75px",
                margin: "0px",

            }}>
            <Paper
                elevation={3}
                sx={{
                    backgroundColor: customTheme.palette.background.paper,
                    width: "500px",
                    margin: "0px",
                    paddingX: "40px",
                    paddingY: "30px",
                }}>
                <Typography
                    sx={{
                        color: customTheme.palette.text.primary,
                        fontSize: "30px",
                        fontWeight: "600",
                    }}>
                    Login
                </Typography>
                <LoginForm />
            </Paper>
        </Box>
    )
}
