import { Button, Stack, TextField } from "@mui/material";
import customTheme from "../../theme/theme";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { registerAsync } from "../../store/auth/asyncThunk";
import { registerSchema, RegisterSchema } from "../../schema/register-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Controller,
    SubmitErrorHandler,
    SubmitHandler,
    useForm,
} from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const RegisterForm = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { loading } = useAppSelector((state) => state.auth);

    const { control, handleSubmit, reset } = useForm<RegisterSchema>({
        resolver: zodResolver(registerSchema),
        mode: "all",
        reValidateMode: "onChange",
    });

    const onSubmit: SubmitHandler<RegisterSchema> = async (data) => {
        const res = await dispatch(registerAsync(data));

        if (registerAsync.fulfilled.match(res)) {
            toast.success("Register Success!");
            reset({
                name: "",
                email: "",
                password: "",
            });
            navigate("/login");
        }
    };

    const onError: SubmitErrorHandler<RegisterSchema> = (data) => {
        console.log("Error:", data);
        toast.error("Form tidak valid");
    };

    return (
        <Stack sx={{ marginY: "15px" }}>
            <form onSubmit={handleSubmit(onSubmit, onError)}>
                <Controller
                    control={control}
                    name="name"
                    render={({ field, fieldState }) => (
                        <TextField
                            label="Full Name"
                            {...field}
                            value={field.value}
                            onChange={field.onChange}
                            onBlur={field.onBlur}
                            error={!!fieldState.error}
                            helperText={fieldState.error?.message}
                            variant="outlined"
                            fullWidth
                            sx={{
                                marginTop: "20px",
                                "& .MuiInputBase-root": {
                                    color: customTheme.palette.text.primary,
                                },
                                "& .MuiOutlinedInput-root": {
                                    "& fieldset": {
                                        borderColor: customTheme.palette.grey[600],
                                        borderWidth: 3,
                                    },
                                    "&:hover fieldset": {
                                        borderColor: customTheme.palette.common.white,
                                        borderWidth: 3,
                                    },
                                    "&.Mui-focused fieldset": {
                                        borderColor: customTheme.palette.common.white,
                                        borderWidth: 3,
                                    },
                                },
                                "& .MuiFormLabel-root": {
                                    color: customTheme.palette.grey[600],
                                },
                                "& .MuiFormLabel-root.Mui-focused": {
                                    color: customTheme.palette.common.white,
                                },
                            }}
                        />
                    )}
                />

                <Controller
                    control={control}
                    name="email"
                    render={({ field, fieldState }) => (
                        <TextField
                            label="Email"
                            {...field}
                            value={field.value}
                            onChange={field.onChange}
                            onBlur={field.onBlur}
                            error={!!fieldState.error}
                            helperText={fieldState.error?.message}
                            variant="outlined"
                            fullWidth
                            sx={{
                                marginTop: "20px",
                                "& .MuiInputBase-root": {
                                    color: customTheme.palette.text.primary,
                                },
                                "& .MuiOutlinedInput-root": {
                                    "& fieldset": {
                                        borderColor: customTheme.palette.grey[600],
                                        borderWidth: 3,
                                    },
                                    "&:hover fieldset": {
                                        borderColor: customTheme.palette.common.white,
                                        borderWidth: 3,
                                    },
                                    "&.Mui-focused fieldset": {
                                        borderColor: customTheme.palette.common.white,
                                        borderWidth: 3,
                                    },
                                },
                                "& .MuiFormLabel-root": {
                                    color: customTheme.palette.grey[600],
                                },
                                "& .MuiFormLabel-root.Mui-focused": {
                                    color: customTheme.palette.common.white,
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
                            {...field}
                            value={field.value}
                            onChange={field.onChange}
                            onBlur={field.onBlur}
                            error={!!fieldState.error}
                            helperText={fieldState.error?.message}
                            variant="outlined"
                            fullWidth
                            sx={{
                                marginTop: "20px",
                                "& .MuiInputBase-root": {
                                    color: customTheme.palette.text.primary,
                                },
                                "& .MuiOutlinedInput-root": {
                                    "& fieldset": {
                                        borderColor: customTheme.palette.grey[600],
                                        borderWidth: 3,
                                    },
                                    "&:hover fieldset": {
                                        borderColor: customTheme.palette.common.white,
                                        borderWidth: 3,
                                    },
                                    "&.Mui-focused fieldset": {
                                        borderColor: customTheme.palette.common.white,
                                        borderWidth: 3,
                                    },
                                },
                                "& .MuiFormLabel-root": {
                                    color: customTheme.palette.grey[600],
                                },
                                "& .MuiFormLabel-root.Mui-focused": {
                                    color: customTheme.palette.common.white,
                                },
                            }}
                        />
                    )}
                />

                <Button type="submit"
                    disabled={loading}
                    sx={{
                        bgcolor: customTheme.palette.primary.main,
                        marginTop: "40px",
                        fontWeight: "600",
                        fontSize: "17.5px",
                        textTransform: "none",
                        color: customTheme.palette.text.primary,
                        width: "100%"
                    }}>
                    {loading ? "Loading..." : "Register"}
                </Button>
            </form>
        </Stack>
    );
};
