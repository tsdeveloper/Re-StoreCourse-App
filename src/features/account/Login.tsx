import LockClockOutlinedIcon from '@mui/icons-material/LockClockOutlined';
import {
    Avatar,
    Box,
    Container,
    Paper,
    TextField,
    Typography
} from "@mui/material";
import Grid from "@mui/material/Grid";
import {Link} from "react-router";
import agent from "../../app/api/agent.ts";
import {FieldValues, useForm} from "react-hook-form";
import {LoadingButton} from "@mui/lab";
import {yupResolver} from "@hookform/resolvers/yup";
import {formSchema} from "../../app/util/validateErrorInput.ts";

export default function Login() {
    const {register, handleSubmit, formState: {isSubmitting, errors}} = useForm({
        resolver: yupResolver(formSchema),
    })

    async function submitForm(data: FieldValues) {
        await agent.Account.login(data)
    }

    return (
        <Container component={Paper} maxWidth="sm"
                   sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', p: 4}}
        >
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
                {errors.password && <p>{errors.password.message}</p>}
                <LoadingButton loading={isSubmitting}
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