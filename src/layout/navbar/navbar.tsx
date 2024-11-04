import { Stack } from "@mui/material";
import { NavList } from "../../component/navbar/nav-list";
import logo from "./logo.svg"

export const Navbar = () => {

    return (
        <Stack
            sx={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                paddingX: "40px",
                paddingY: "5px",
                backgroundColor: "rgba(11, 11, 11, 0.3)",
                backdropFilter: "blur(10px)",
                position: "fixed",
                width: "100%",
                zIndex: 10,
            }}
        >
            <img src={logo} width={"60px"} />
            <Stack>
                <NavList />
            </Stack>
        </Stack>
    );
};
