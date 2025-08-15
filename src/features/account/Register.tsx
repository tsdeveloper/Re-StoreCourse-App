import { LoadingButton } from "@mui/lab";
import {Avatar, Box, Container, CssBaseline, Grid, Paper, TextField, Typography} from "@mui/material";
import {Link} from "react-router";
import LockClockOutlinedIcon from "@mui/icons-material/LockClockOutlined";
import {yupResolver} from "@hookform/resolvers/yup";
import {formRegisterSchema} from "../../app/util/validateErrorInput.ts";
import {useForm} from "react-hook-form";
import agent from "../../app/api/agent.ts";

export default function Register(){

    const { register, handleSubmit, formState: {isSubmitting, errors, isValid }} = useForm({
        resolver: yupResolver(formRegisterSchema),
        mode: "onTouched",
    })

    return (
        <Container component={Paper} maxWidth="xs"
                   sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', p: 4}}
        >
            <CssBaseline />
            <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
                <LockClockOutlinedIcon/>
            </Avatar>
            <Typography component="h1" variant="h5">
                Register
            </Typography>
            <Box maxWidth="md" component="form" onSubmit={handleSubmit(data => agent.Account.register(data) )} noValidate >
                <TextField
                    margin="normal"
                    fullWidth
                    label="Username"
                    autoFocus
                    {...register('username', {required: 'Username is required'})}
                    error={!!errors.username}
                    helperText={errors?.username?.message as string}
                />
                <TextField
                    margin="normal"
                    fullWidth
                    label="Email"
                    {...register('email', {required: true})}
                    error={!!errors.email}
                    helperText={errors?.email?.message as string}
                />

                <TextField
                    margin="normal"
                    fullWidth
                    label="Password"
                    type="password"
                    {...register('password', {required: true})}
                    error={!!errors.password}
                    helperText={errors?.password?.message as string}
                />
                <LoadingButton loading={isSubmitting}
                               disabled={!isValid}
                               type="submit" fullWidth
                               variant="contained" sx={{mt: 3, mb: 2}}
                >
                    Register
                </LoadingButton>
                <Grid container>
                    <Grid>
                        <Link to="/register">
                            {"Already have an account? Sign in"}
                        </Link>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    )
}