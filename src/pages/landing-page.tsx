import { Stack } from "@mui/material";
import { Navbar } from "../layout/navbar/navbar";
import { LandingPages } from "../layout/base/landingpages";

export const LandingPage = () => {

    return (
        <Stack>
            <Navbar />
            <LandingPages />
        </Stack>
    )
}
