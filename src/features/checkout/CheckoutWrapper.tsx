import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useCallback, useEffect, useState } from 'react';
import agent from '../../app/api/agent.ts';
import LoadingComponent from '../../app/layout/LoadingComponent.tsx';
import { useAppDispatch } from '../../app/store/configureStore.ts';
import { setBasket } from '../basket/basketSlice.ts';
import CheckoutPage from './CheckoutPage.tsx';

const stripePromise = loadStripe(
	'pk_test_51S0splPkMfhkscsAPa6qMplyc0QM1JebVoymdgud5hvRFoUsklBaBrEyupGUGoBojW2D5Zr0H3zXIHmLx6ug3CB100hz8LdQWM',
);

export default function CheckoutWrapper() {
	const dispatch = useAppDispatch();
	const [loading, setLoading] = useState(true);

	const createPaymentIntent = useCallback(async () => {
		console.log('createPaymentIntent');
		agent.Payments.createPaymentIntent()
			.then((basket) => dispatch(setBasket(basket)))
			.catch((error) => console.log(error))
			.finally(() => setLoading(false));
	}, [dispatch]);

	useEffect(() => {
		createPaymentIntent().then(() => setLoading(false));
	}, [createPaymentIntent]);

	if (loading) return <LoadingComponent message="Loading checkout..." />;
	return (
		<Elements stripe={stripePromise}>
			<CheckoutPage />
		</Elements>
	);
}
