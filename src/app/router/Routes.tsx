import { createBrowserRouter, Navigate } from 'react-router';
import AboutPage from '../../features/about/AboutPage';
import Login from '../../features/account/Login';
import Register from '../../features/account/Register.tsx';
import { BasketPage } from '../../features/basket/BasketPage';
import Catalog from '../../features/catalog/Catalog';
import ProductDetails from '../../features/catalog/ProductDetails';
import CheckoutWrapper from '../../features/checkout/CheckoutWrapper.tsx';
import ContactPage from '../../features/contact/ContactPage';
import HomePage from '../../features/home/HomePage';
import Order from '../../features/orders/Order.tsx';
import NotFound from '../errors/NotFound';
import ServerError from '../errors/ServerError';
import App from '../layout/App';
import RequireAuth from './RequireAuth.tsx';

export const router = createBrowserRouter([
	{
		path: '/',
		element: <App />,
		children: [
			{
				element: <RequireAuth />,
				children: [
					{ path: 'checkout', element: <CheckoutWrapper /> },
					{ path: 'orders', element: <Order /> },
				],
			},
			{ path: 'catalog', element: <Catalog /> },
			{ path: 'catalog/:id', element: <ProductDetails /> },
			{ path: 'about', element: <AboutPage /> },
			{ path: 'contact', element: <ContactPage /> },
			{ path: 'basket', element: <BasketPage /> },
			{ path: 'server-error', element: <ServerError /> },
			{ path: 'not-found', element: <NotFound /> },
			{ path: 'login', element: <Login /> },
			{ path: 'register', element: <Register /> },
			{ path: '*', element: <Navigate to="/not-found" /> },
		],
	},
]);
