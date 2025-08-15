import {
	Container,
	CssBaseline,
	createTheme,
	ThemeProvider,
} from '@mui/material';
import {useCallback, useEffect, useState} from 'react';
import { Outlet } from 'react-router';
import { ToastContainer } from 'react-toastify';
import {fetchBasketAsync} from '../../features/basket/basketSlice';
import { useAppDispatch } from '../store/configureStore';
import Header from './Header';
import LoadingComponent from './LoadingComponent';
import {fetchCurrentUser} from "../../features/account/accountSlice.ts";

function App() {
	const dispatch = useAppDispatch();
	const [darkMode, setDarkMode] = useState(false);
	const [loading, setLoading] = useState(true);

    const initApp = useCallback(async () => {
        try {
            await dispatch(fetchCurrentUser());
            await dispatch(fetchBasketAsync());
        }catch (error) {
            console.log(error);
        }
    }, [dispatch]);

	useEffect(() => {
		initApp().then(() => setLoading(false));
	}, [initApp]);

	const palleteType = darkMode ? 'dark' : 'light';
	const theme = createTheme({
		palette: {
			mode: palleteType,
			background: {
				default: palleteType === 'light' ? '#eaeaea' : '#121212',
			},
		},
	});

	function handleThemeChange() {
		setDarkMode(!darkMode);
	}

	if (loading) return <LoadingComponent message="Initialising app..." />;

	return (
		<ThemeProvider theme={theme}>
			<ToastContainer
				position="bottom-right"
				newestOnTop
				hideProgressBar
				theme="colored"
			/>
			<CssBaseline />
			<Header darkMode={darkMode} handleThemeChange={handleThemeChange} />
			<Container>
				<Outlet />
			</Container>
		</ThemeProvider>
	);
}

export default App;
