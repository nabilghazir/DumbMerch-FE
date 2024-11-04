import { Stack, Typography } from "@mui/material";
import customTheme from "../../theme/theme";
import { ProfileCompo } from "./profile-component";
import { ProfileBodyProps } from "./profile-props";

export const ProfileBody: React.FC<ProfileBodyProps> = ({ profileData }) => {
    return (
        <Stack spacing={2}>
            {ProfileCompo.map(({ label, key }) => (
                <Stack
                    key={key}
                    sx={{
                        gap: "10px"
                    }}
                >
                    <Typography
                        variant="h5"
                        sx={{
                            fontWeight: "600",
                            fontSize: "30px",
                            color: customTheme.palette.primary.main
                        }}
                    >
                        {label}
                    </Typography>
                    <Typography variant="h6">
                        {profileData[key as keyof ProfileBodyProps['profileData']] || "N/A"}
                    </Typography>
                </Stack>
            ))}
        </Stack>
    );
};
