import { Button, Stack, TextField } from "@mui/material";
import customTheme from "../../theme/theme";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { loginAsync } from "../../store/auth/asyncThunk";
import { LoginSchema, loginSchema } from "../../schema/login-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";

export const LoginForm = () => {
    const dispatch = useAppDispatch();
    const { loading } = useAppSelector((state) => state.auth);

    const { control, handleSubmit, reset } = useForm<LoginSchema>({
        resolver: zodResolver(loginSchema),
        mode: "all",
        reValidateMode: "onChange",
    });

    const onSubmit: SubmitHandler<LoginSchema> = async (data) => {
        await dispatch(loginAsync(data));
        reset({
            email: "",
            password: "",
        });
    };

    const onError: SubmitErrorHandler<LoginSchema> = (data) => {
        console.log("Error:", data);
        toast.error("Form tidak valid");
    };

    return (
        <Stack
            sx={{
                marginY: "15px",
            }}
        >
            <form onSubmit={handleSubmit(onSubmit, onError)}>
                <Controller
                    control={control}
                    name="email"
                    render={({ field, fieldState }) => (
                        <TextField
                            label="Email"
                            variant="outlined"
                            fullWidth
                            {...field}
                            value={field.value}
                            onChange={field.onChange}
                            onBlur={field.onBlur}
                            error={!!fieldState.error}
                            helperText={fieldState.error?.message}
                            sx={{
                                marginTop: "20px",
                                "& .MuiInputBase-root": {
                                    color: customTheme.palette.text.primary, // Text color
                                },
                                "& .MuiOutlinedInput-root": {
                                    "& fieldset": {
                                        borderColor: customTheme.palette.grey[600], // Default border color
                                        borderWidth: 3,
                                    },
                                    "&:hover fieldset": {
                                        borderColor: customTheme.palette.common.white, // Hover border color
                                        borderWidth: 3,
                                    },
                                    "&.Mui-focused fieldset": {
                                        borderColor: customTheme.palette.common.white, // Focus border color
                                        borderWidth: 3,
                                    },
                                },
                                "& .MuiFormLabel-root": {
                                    color: customTheme.palette.grey[600], // Label color
                                },
                                "& .MuiFormLabel-root.Mui-focused": {
                                    color: customTheme.palette.common.white, // Focused label color
                                },
                            }}
                        />
                    )}
                />

                <Controller
                    control={control}
                    name="password"
                    render={({ field, fieldState }) => (
                        <TextField
                            label="Password"
                            type="password"
                            variant="outlined"
                            fullWidth
                            {...field}
                            value={field.value}
                            onChange={field.onChange}
                            onBlur={field.onBlur}
                            error={!!fieldState.error}
                            helperText={fieldState.error?.message}
                            sx={{
                                marginTop: "20px",
                                "& .MuiInputBase-root": {
                                    color: customTheme.palette.text.primary, // Text color
                                },
                                "& .MuiOutlinedInput-root": {
                                    "& fieldset": {
                                        borderColor: customTheme.palette.grey[600], // Default border color
                                        borderWidth: 3,
                                    },
                                    "&:hover fieldset": {
                                        borderColor: customTheme.palette.common.white, // Hover border color
                                        borderWidth: 3,
                                    },
                                    "&.Mui-focused fieldset": {
                                        borderColor: customTheme.palette.common.white, // Focus border color
                                        borderWidth: 3,
                                    },
                                },
                                "& .MuiFormLabel-root": {
                                    color: customTheme.palette.grey[600], // Label color
                                },
                                "& .MuiFormLabel-root.Mui-focused": {
                                    color: customTheme.palette.common.white, // Focused label color
                                },
                            }}
                        />
                    )}
                />

                <Button
                    type="submit"
                    sx={{
                        bgcolor: customTheme.palette.primary.main,
                        color: customTheme.palette.text.primary,
                        marginTop: "40px",
                        fontWeight: "600",
                        fontSize: "17.5px",
                        textTransform: "none",
                        width: "100%"
                    }}
                    disabled={loading}
                >
                    {loading ? "Loading..." : "Login"}
                </Button>
            </form>
        </Stack>
    );
};
