import { Button, Stack, Typography } from "@mui/material"
import customTheme from "../../theme/theme"
import { Link } from "react-router-dom"

export const LandingPages = () => {
    return (
        <Stack
            sx={{
                backgroundImage: `url('https://images.unsplash.com/photo-1671159593357-ee577a598f71?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`,
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                height: '100vh',
                width: '100%',
                alignItems: 'center',
            }}
        >
            <Stack
                sx={{
                    marginTop: "80px",
                    justifyContent: "center",
                    alignItems: "center",
                }}>
                <img src="logo.svg" width={"350px"} />
                <Typography
                    variant="h5"
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        color: customTheme.palette.grey[600],
                        fontSize: "40px",
                        gap: "7.5px",
                    }}>
                    The Biggest Merchandise in
                    <Typography
                        variant="h5"
                        sx={{
                            fontSize: "40px",
                            fontWeight: "bold",
                        }}>
                        Indonesia
                    </Typography>
                </Typography>
                <Button
                    component={Link}
                    to="/login"
                    variant="contained"
                    color="primary"
                    sx={{
                        marginTop: "20px",
                        fontSize: "18px",
                        fontWeight: "bold",
                    }}
                >
                    Get Started
                </Button>
            </Stack>

        </Stack>
    )
}
