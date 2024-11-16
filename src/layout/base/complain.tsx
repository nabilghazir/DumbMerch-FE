import { Paper, Stack } from "@mui/material"
import { ComplainChatRoom } from "../../component/complain/complain-chat-room"
import { ComplainChat } from "../../component/complain/complain-chat"


export const Complain = () => {



    return (
        <Stack
            sx={{
                width: "100%",
                height: "100%",
                justifyContent: "center",
                alignItems: "center"
            }}>
            <Stack
                sx={{
                    width: "90%",
                    height: "100%",
                    marginTop: "100px"
                }}>
                <Paper
                    sx={{
                        width: "100%",
                        height: "100%"
                    }}>
                    <Stack>
                        <ComplainChatRoom />
                    </Stack>
                    <Stack>
                        <ComplainChat />
                    </Stack>
                </Paper>
            </Stack>
        </Stack>
    )
}
