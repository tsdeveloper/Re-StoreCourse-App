import { LoadingButton } from "@mui/lab";
import {Avatar, Box, Container, CssBaseline, Grid, Paper, TextField, Typography} from "@mui/material";
import {Link, useNavigate} from "react-router";
import LockClockOutlinedIcon from "@mui/icons-material/LockClockOutlined";
import {yupResolver} from "@hookform/resolvers/yup";
import {checkValidationRegister} from "../../app/util/validateErrorInput.ts";
import {useForm} from "react-hook-form";
import agent from "../../app/api/agent.ts";
import {toast} from "react-toastify";

export default function Register(){
    const navigate = useNavigate();
    const { register, handleSubmit, setError, formState: { isSubmitting, errors, isValid }} = useForm({
        mode: "all",
        resolver: yupResolver(checkValidationRegister),
    })
    console.log(errors);
    function handleApiErrors(errors: any) {
        if (errors){
            errors.forEach((error: string) => {
                if (error.includes('Password')) {
                    setError('password', {message: error})
                } else if (error.includes('Email')){
                    setError('email', {message: error})
                } else if (error.includes('Username')){
                    setError('username', {message: error})
                }
            });
        }
    }

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
            <Box maxWidth="md" component="form"
                 onSubmit={handleSubmit(data =>
                     agent.Account.register(data)
                         .then(() => {
                             toast.success('Registration successful - you can now login')
                             navigate('/login');
                         })
                         .catch(error => handleApiErrors(error)))} noValidate
            sx={{ mt: 1}}>
                <TextField
                    margin="normal"
                    fullWidth
                    label="Username"
                    autoFocus
                    {...register('username')}
                    error={!!errors.username}
                    helperText={errors?.username?.message?.toString()}

                />
                <TextField
                    margin="normal"
                    fullWidth
                    label="Email"
                    {...register('email', {
                        required: 'Email is required',
                    })}
                    error={!!errors.email}
                    helperText={errors?.email?.message?.toString()}
                />

                <TextField
                    margin="normal"
                    fullWidth
                    label="Password"
                    type="password"
                    {...register('password')}
                    error={!!errors.password}
                    helperText={errors?.password?.message?.toString()}
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