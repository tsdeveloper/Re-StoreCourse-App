import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutPage from './CheckoutPage.tsx';

const stripePromise = loadStripe(
	'pk_test_51S0splPkMfhkscsAPa6qMplyc0QM1JebVoymdgud5hvRFoUsklBaBrEyupGUGoBojW2D5Zr0H3zXIHmLx6ug3CB100hz8LdQWM',
);

export default function CheckoutWrapper() {
	return (
		<Elements stripe={stripePromise}>
			<CheckoutPage />
		</Elements>
	);
}
