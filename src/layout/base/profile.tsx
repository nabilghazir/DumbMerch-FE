import { useEffect } from "react";
import { Box, Paper, Stack, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { getProfile } from "../../store/profile/asyncThunk";
import customTheme from "../../theme/theme";
import { checkAuth } from "../../store/auth/asyncThunk";
import { ProfileBody } from "../../component/profile/profile-body";
import { ProfileData } from "../../component/profile/profile-props";
import { ProfileEditModal } from "../../component/profile/profile-edit-modal";

export const Profile = () => {
    const dispatch = useAppDispatch();
    const { profile: { name, phone, gender, address, avatar } = {} } = useAppSelector((state) => state.profile);
    const { user: { email } = {} } = useAppSelector((state) => state.auth);

    useEffect(() => {
        dispatch(getProfile());
        dispatch(checkAuth());
    }, [dispatch]);

    const profileData: ProfileData = { email, name, phone, gender, address };

    return (
        <Stack
            sx={{
                justifyContent: "center",
                alignItems: "center",
                marginTop: "75px"
            }}
        >
            <Paper
                sx={{
                    width: "80%",
                    height: "700px",
                    padding: "30px"
                }}
            >
                <Stack
                    sx={{
                        justifyContent: "space-between",
                        alignItems: "center",
                        flexDirection: "row",
                    }}>
                    <Typography
                        variant="h3"
                        sx={{
                            marginTop: "-10px",
                            color: customTheme.palette.primary.main,
                            fontWeight: "600",
                            fontSize: "40px"
                        }}
                    >
                        My Profile
                    </Typography>
                    <ProfileEditModal />
                </Stack>
                <Stack
                    sx={{
                        width: "100%",
                        height: "100%",
                        flexDirection: "row",
                        gap: "5%"
                    }}
                >
                    <Box
                        sx={{
                            width: "50%",
                            height: "100%"
                        }}
                    >
                        <img
                            src={avatar}
                            alt="Profile Avatar"
                            style={{
                                objectFit: "contain",
                                width: "100%",
                                height: "100%"
                            }}
                        />
                    </Box>
                    <Stack
                        sx={{
                            gap: "20px",
                            marginTop: "30px",
                        }}
                    >
                        <ProfileBody profileData={profileData} />
                    </Stack>
                </Stack>
            </Paper>
        </Stack>
    );
};
