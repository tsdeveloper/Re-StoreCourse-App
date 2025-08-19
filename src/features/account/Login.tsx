import LockClockOutlinedIcon from '@mui/icons-material/LockClockOutlined';
import {
    Avatar,
    Box,
    Container, CssBaseline,
    Paper,
    TextField,
    Typography
} from "@mui/material";
import Grid from "@mui/material/Grid";
import {Link, useNavigate} from "react-router";
import {FieldValues, useForm} from "react-hook-form";
import {LoadingButton} from "@mui/lab";
import {yupResolver} from "@hookform/resolvers/yup";
import {formLoginSchema} from "../../app/util/validateErrorInput.ts";
import {useAppDispatch} from "../../app/store/configureStore.ts";
import {signInUser} from "./accountSlice.ts";

export default function Login() {
    const  navigate = useNavigate();
    const dispatch = useAppDispatch();
    const {register, handleSubmit, formState: {isSubmitting, errors, isValid}} = useForm({
        resolver: yupResolver(formLoginSchema),
        mode: "onTouched",
    })

    async function submitForm(data: FieldValues) {
      await dispatch(signInUser(data));
      navigate('/catalog')
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
                Sign in
            </Typography>
            <Box maxWidth="md" component="form" onSubmit={handleSubmit(submitForm)} noValidate >
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
                    Sign In
                </LoadingButton>
                <Grid container>
                    <Grid>
                        <Link to="/register">
                            {"Don't have an account? Sign Up"}
                        </Link>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    )
}