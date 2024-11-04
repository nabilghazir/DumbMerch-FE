import { Button, Link, Stack, Typography } from '@mui/material';
import { useLocation } from 'react-router-dom'; // Import useLocation
import Logo from "../../assets/auth/Frame@3x.svg";
import customTheme from '../../theme/theme';

export const AuthLeft = () => {
    const location = useLocation(); // Get the current location
    const isLoginPage = location.pathname === "/login";
    const isRegisterPage = location.pathname === "/register";

    return (
        <Stack
            sx={{
                flexDirection: "column",
                paddingRight: "50px",
                paddingLeft: "75px",
                paddingY: "80px",
                height: "100vh",

            }}>
            <img
                src={Logo}
                width={"300px"}
            />
            <Typography
                variant="h1"
                sx={{
                    fontSize: "67.5px",
                    fontWeight: "lighter",
                    marginTop: "10px"
                }}>
                Easy, Fast and Reliable
            </Typography>

            <Typography
                variant="h3"
                sx={{
                    fontSize: "20px",
                    width: "75%",
                    color: customTheme.palette.grey[700]
                }}>
                Go shopping for merchandise, just go to dumb merch shopping. the biggest merchandise in
                <Typography
                    component="span"
                    sx={{
                        fontWeight: "bold",
                        marginX: "5px",
                        fontSize: "20px",
                    }}>
                    Indonesia
                </Typography>
            </Typography>

            <Stack
                sx={{
                    marginTop: "50px",
                    flexDirection: "row",
                }}>

                <Link href="/login">
                    <Button
                        sx={{
                            bgcolor: isLoginPage ? customTheme.palette.primary.main : "none",
                            width: "175px",
                            color: customTheme.palette.text.primary,
                            fontWeight: "bold",
                            fontSize: "18px",
                            textTransform: "none",
                            borderRadius: "10px 0px 0px 10px",
                            "&:hover": {
                                bgcolor: customTheme.palette.primary.main,
                            }
                        }}>
                        Login
                    </Button>
                </Link>

                <Link href="/register">
                    <Button
                        sx={{
                            bgcolor: isRegisterPage ? customTheme.palette.primary.main : "none",
                            width: "175px",
                            color: customTheme.palette.text.primary,
                            fontWeight: "bold",
                            fontSize: "18px",
                            textTransform: "none",
                            borderRadius: "0px 10px 10px 0px",
                            "&:hover": {
                                bgcolor: customTheme.palette.primary.main,
                            }
                        }}>
                        Register
                    </Button>
                </Link>
            </Stack>
        </Stack>
    )
}
